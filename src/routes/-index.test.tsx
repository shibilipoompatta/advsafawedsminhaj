import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Route } from './index'

const Home = Route.options.component!

describe('wedding invitation home', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('opens the wax-seal cover on click and exposes the .ics calendar download', () => {
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

    const icsLink = screen.getByRole('link', { name: /Apple Calendar & Outlook/i })
    expect(icsLink).toHaveAttribute('href', '/safa-minhaj-wedding.ics')
    expect(icsLink).toHaveAttribute('download', 'safa-minhaj-wedding.ics')
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
})
