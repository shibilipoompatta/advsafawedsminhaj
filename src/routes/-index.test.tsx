import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Route } from './index'

const Home = Route.options.component!

describe('wedding invitation home', () => {
  const originalUserAgent = navigator.userAgent

  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  })

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    })
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('opens the wax-seal cover on click and renders a single Add to Calendar link', () => {
    vi.setSystemTime(new Date('2026-11-11T12:00:00+05:30'))
    render(<Home />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.click(screen.getByRole('button', { name: 'Open wedding invitation' }))
    expect(document.body.style.overflow).toBe('')

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    const calendarLink = screen.getByRole('link', { name: /Add to Calendar/i })
    expect(calendarLink).toHaveAttribute('href', expect.stringContaining('calendar.google.com'))
    expect(screen.getByText(/Near Chennamangallur · ~4 km from Mukkam town/i)).toBeInTheDocument()
  })

  it('routes Apple devices to the .ics calendar file when clicking Add to Calendar', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',
      configurable: true,
    })
    const assignMock = vi.fn()
    vi.stubGlobal('location', { ...window.location, assign: assignMock })

    render(<Home />)
    fireEvent.click(screen.getByRole('button', { name: 'Open wedding invitation' }))
    act(() => {
      vi.advanceTimersByTime(500)
    })

    fireEvent.click(screen.getByRole('link', { name: /Add to Calendar/i }))
    expect(assignMock).toHaveBeenCalledWith('/safa-minhaj-wedding.ics')

    vi.unstubAllGlobals()
  })

  it('shows wedding-day and post-wedding countdown milestones', () => {
    vi.setSystemTime(new Date('2026-11-29T11:30:00+05:30'))
    const { unmount } = render(<Home />)
    expect(screen.getByText('Today is the day')).toBeInTheDocument()
    unmount()

    vi.setSystemTime(new Date('2026-11-30T10:00:00+05:30'))
    render(<Home />)
    expect(screen.getByText('Happily Married · Alhamdulillah')).toBeInTheDocument()
  })

  it('toggles background music and stays muted across page clicks', () => {
    vi.setSystemTime(new Date('2026-11-11T12:00:00+05:30'))
    let isPaused = true
    const playSpy = vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
      isPaused = false
      this.dispatchEvent(new Event('play'))
      return Promise.resolve()
    })
    const pauseSpy = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
      isPaused = true
      this.dispatchEvent(new Event('pause'))
    })
    vi.spyOn(HTMLMediaElement.prototype, 'paused', 'get').mockImplementation(() => isPaused)

    render(<Home />)
    expect(screen.queryByRole('button', { name: /background music/i })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Open wedding invitation' }))
    const muteButton = screen.getByRole('button', { name: 'Mute background music' })
    expect(muteButton).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(muteButton)
    expect(pauseSpy).toHaveBeenCalled()
    const playButton = screen.getByRole('button', { name: 'Play background music' })
    expect(playButton).toHaveAttribute('aria-pressed', 'false')

    const playCallsBeforePageClick = playSpy.mock.calls.length
    fireEvent.click(document.body)
    expect(playSpy).toHaveBeenCalledTimes(playCallsBeforePageClick)

    fireEvent.click(playButton)
    expect(playSpy).toHaveBeenCalledTimes(playCallsBeforePageClick + 1)
    expect(screen.getByRole('button', { name: 'Mute background music' })).toHaveAttribute('aria-pressed', 'true')
  })
})
