import { n as siteUrl } from "./router-DpHpp-dR.js";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowUpRight, CalendarDays, Check, Heart, MapPin, Share2, Volume2, VolumeX } from "lucide-react";
// src/routes/index.tsx?tsr-split=component
var weddingDate = (/* @__PURE__ */ new Date("2026-11-29T10:15:00+05:30")).getTime();
var weddingDayEnd = (/* @__PURE__ */ new Date("2026-11-29T23:59:59+05:30")).getTime();
var googleCalendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams({
	action: "TEMPLATE",
	text: "Wedding of Adv. Safa Janna TK & Muhammed Minhaj NC",
	dates: "20261129T044500Z/20261129T083000Z",
	ctz: "Asia/Kolkata",
	details: `Join us to celebrate our wedding on Sunday, 29 November 2026.\nNikah: 10:15 AM IST.\nReception: 11:00 AM–2:00 PM IST.\nWith love and blessings from our families.\n${siteUrl}`,
	location: "NC Convention Centre, Pulparamba, Mukkam, Kozhikode, Kerala"
})}`;
var mapUrl = "https://www.google.com/maps/search/?api=1&query=NC+Convention+Centre+Pulparamba+Mukkam+Kozhikode";
var icsUrl = "/safa-minhaj-wedding.ics";
function isAppleDevice() {
	if (typeof navigator === "undefined") return false;
	const ua = navigator.userAgent;
	return /iPad|iPhone|iPod/.test(ua) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1 || /Macintosh|Mac OS X/.test(ua);
}
function handleCalendarClick(event) {
	if (isAppleDevice()) {
		event.preventDefault();
		window.location.assign(icsUrl);
	}
}
function useReveal() {
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (typeof IntersectionObserver === "undefined" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			el.dataset.reveal = "visible";
			return;
		}
		if (el.getBoundingClientRect().top < window.innerHeight * .92) {
			el.dataset.reveal = "visible";
			return;
		}
		el.dataset.reveal = "pending";
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				el.dataset.reveal = "visible";
				observer.unobserve(el);
			}
		}, {
			threshold: .12,
			rootMargin: "0px 0px -40px 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return ref;
}
function Countdown() {
	const [now, setNow] = useState(null);
	useEffect(() => {
		const update = () => setNow(Date.now());
		update();
		const timer = window.setInterval(update, 1e3);
		return () => window.clearInterval(timer);
	}, []);
	if (now !== null && now >= weddingDate) {
		const isWeddingDay = now <= weddingDayEnd;
		return /* @__PURE__ */ jsxs("div", {
			className: "countdown-milestone",
			role: "status",
			children: [/* @__PURE__ */ jsx("p", {
				className: "milestone-title",
				children: isWeddingDay ? "Today is the day" : "Happily Married · Alhamdulillah"
			}), /* @__PURE__ */ jsx("p", {
				className: "milestone-sub",
				children: isWeddingDay ? "Join us at NC Convention Centre · Nikah at 10:15 AM IST" : "Thank you for celebrating our special day with us"
			})]
		});
	}
	const remaining = now === null ? null : Math.max(0, weddingDate - now);
	const values = remaining === null ? [
		"—",
		"—",
		"—",
		"—"
	] : [
		Math.floor(remaining / 864e5),
		Math.floor(remaining / 36e5) % 24,
		Math.floor(remaining / 6e4) % 60,
		Math.floor(remaining / 1e3) % 60
	];
	return /* @__PURE__ */ jsx("div", {
		className: "countdown",
		children: values.map((value, i) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", { children: String(value).padStart(2, "0") }), /* @__PURE__ */ jsx("small", { children: [
			"Days",
			"Hours",
			"Minutes",
			"Seconds"
		][i] })] }, i))
	});
}
function InvitationMusic({ audioRef, active }) {
	const [playing, setPlaying] = useState(false);
	const userPausedRef = useRef(false);
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		const onPlay = () => setPlaying(true);
		const onPause = () => setPlaying(false);
		audio.addEventListener("play", onPlay);
		audio.addEventListener("pause", onPause);
		return () => {
			audio.removeEventListener("play", onPlay);
			audio.removeEventListener("pause", onPause);
		};
	}, [audioRef]);
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || !active) return;
		let disposed = false;
		const play = () => {
			if (!disposed && audio.paused && !userPausedRef.current) audio.play().catch(() => {});
		};
		const retryOnInteraction = (event) => {
			if (event.target instanceof Element && event.target.closest("a, .music-toggle")) return;
			play();
		};
		audio.addEventListener("canplay", play);
		document.addEventListener("click", retryOnInteraction);
		document.addEventListener("touchend", retryOnInteraction);
		document.addEventListener("keydown", retryOnInteraction);
		play();
		return () => {
			disposed = true;
			audio.removeEventListener("canplay", play);
			document.removeEventListener("click", retryOnInteraction);
			document.removeEventListener("touchend", retryOnInteraction);
			document.removeEventListener("keydown", retryOnInteraction);
			audio.pause();
		};
	}, [active, audioRef]);
	function toggleMusic() {
		const audio = audioRef.current;
		if (!audio) return;
		if (audio.paused) {
			userPausedRef.current = false;
			audio.play().catch(() => {});
		} else {
			userPausedRef.current = true;
			audio.pause();
		}
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("audio", {
		ref: audioRef,
		loop: true,
		preload: "auto",
		hidden: true,
		"aria-hidden": "true",
		src: "/audio/wedding-background-from-21.m4a"
	}), active && /* @__PURE__ */ jsxs("button", {
		type: "button",
		className: "music-toggle",
		onClick: toggleMusic,
		"aria-label": playing ? "Mute background music" : "Play background music",
		"aria-pressed": playing,
		children: [playing ? /* @__PURE__ */ jsx(Volume2, {
			size: 14,
			"aria-hidden": "true"
		}) : /* @__PURE__ */ jsx(VolumeX, {
			size: 14,
			"aria-hidden": "true"
		}), /* @__PURE__ */ jsx("span", { children: playing ? "Music" : "Muted" })]
	})] });
}
function InvitationCover({ closing, onOpen }) {
	const onOpenRef = useRef(onOpen);
	useEffect(() => {
		onOpenRef.current = onOpen;
	}, [onOpen]);
	useEffect(() => {
		if (closing) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKeyDown = (event) => {
			if (event.key === "Escape") onOpenRef.current();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [closing]);
	return /* @__PURE__ */ jsxs("div", {
		className: `cover-overlay${closing ? " is-closing" : ""}`,
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "cover-title",
		children: [/* @__PURE__ */ jsx("div", {
			className: "cover-florals",
			"aria-hidden": "true"
		}), /* @__PURE__ */ jsxs("div", {
			className: "cover-card",
			children: [
				/* @__PURE__ */ jsx("div", { className: "cover-card-inner" }),
				/* @__PURE__ */ jsx("p", {
					className: "eyebrow cover-eyebrow",
					children: "Wedding Invitation"
				}),
				/* @__PURE__ */ jsxs("h2", {
					id: "cover-title",
					className: "cover-names",
					children: [
						"Safa ",
						/* @__PURE__ */ jsx("span", { children: "&" }),
						" Minhaj"
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "cover-date",
					children: "29 · 11 · 2026"
				}),
				/* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "wax-seal-btn",
					onClick: onOpen,
					"aria-label": "Open wedding invitation",
					children: [/* @__PURE__ */ jsx("span", {
						className: "wax-seal",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsxs("span", {
							className: "wax-seal-ring",
							children: [
								"S",
								/* @__PURE__ */ jsx("i", { children: "&" }),
								"M"
							]
						})
					}), /* @__PURE__ */ jsx("span", {
						className: "cover-cta",
						children: "Open Invitation"
					})]
				})
			]
		})]
	});
}
function Home() {
	const [opened, setOpened] = useState(false);
	const [coverDismissed, setCoverDismissed] = useState(false);
	const [shared, setShared] = useState(false);
	const [shareMessage, setShareMessage] = useState("");
	const audioRef = useRef(null);
	const celebrationRef = useReveal();
	const countdownRef = useReveal();
	const venueRef = useReveal();
	const closingRef = useReveal();
	useEffect(() => {
		if (!opened || coverDismissed) return;
		const timer = window.setTimeout(() => setCoverDismissed(true), 500);
		return () => window.clearTimeout(timer);
	}, [opened, coverDismissed]);
	function openInvitation() {
		if (opened) return;
		setOpened(true);
		const audio = audioRef.current;
		if (audio && audio.paused) audio.play().catch(() => {});
	}
	async function share() {
		const data = {
			title: "Safa & Minhaj · Wedding Invitation",
			text: "Join us on 29 November 2026 at NC Convention Centre, Pulparamba, Mukkam, Kozhikode.",
			url: siteUrl
		};
		try {
			if (navigator.share) await navigator.share(data);
			else {
				await navigator.clipboard.writeText(data.url);
				setShared(true);
				setShareMessage("Invitation link copied");
				window.setTimeout(() => setShared(false), 3e3);
			}
		} catch (error) {
			if (!(error instanceof DOMException && error.name === "AbortError")) setShareMessage("Please copy the invitation link from your browser to share.");
		}
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		!coverDismissed && /* @__PURE__ */ jsx(InvitationCover, {
			closing: opened,
			onOpen: openInvitation
		}),
		/* @__PURE__ */ jsxs("header", {
			className: "site-header",
			children: [/* @__PURE__ */ jsxs("a", {
				className: "monogram",
				href: "#invitation",
				"aria-label": "Safa and Minhaj home",
				children: [
					"S",
					/* @__PURE__ */ jsx("span", { children: "&" }),
					"M",
					/* @__PURE__ */ jsx("i", {})
				]
			}), /* @__PURE__ */ jsxs("nav", {
				"aria-label": "Main navigation",
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "#celebration",
						children: "The celebration"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "#venue",
						children: "The venue"
					}),
					/* @__PURE__ */ jsxs("a", {
						className: "nav-save",
						href: googleCalendarUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: handleCalendarClick,
						children: [/* @__PURE__ */ jsx(CalendarDays, { size: 14 }), " Save the date"]
					})
				]
			})]
		}),
		/* @__PURE__ */ jsxs("main", { children: [
			/* @__PURE__ */ jsxs("section", {
				className: "hero",
				id: "invitation",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "hero-florals",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "invitation-frame",
						children: [/* @__PURE__ */ jsx("div", { className: "frame-inner" }), /* @__PURE__ */ jsxs("div", {
							className: "invitation-copy",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "arabic",
									lang: "ar",
									dir: "rtl",
									children: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "eyebrow invocation",
									children: "In the name of Allah"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "little-divider",
									children: [
										/* @__PURE__ */ jsx("span", {}),
										"✧",
										/* @__PURE__ */ jsx("span", {})
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "intro",
									children: "With hearts full of love and gratitude"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "intro",
									children: "we are tying the knot with our families"
								}),
								/* @__PURE__ */ jsxs("h1", { children: [
									/* @__PURE__ */ jsxs("span", {
										className: "name",
										children: [
											/* @__PURE__ */ jsx("small", { children: "Adv." }),
											" Safa Janna ",
											/* @__PURE__ */ jsx("small", { children: "TK" })
										]
									}),
									/* @__PURE__ */ jsx("span", {
										className: "ampersand",
										children: "&"
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "name",
										children: ["Muhammed Minhaj ", /* @__PURE__ */ jsx("small", { children: "NC" })]
									})
								] }),
								/* @__PURE__ */ jsxs("div", {
									className: "families",
									children: [
										/* @__PURE__ */ jsx("p", { children: "D/o Abdul Jabbar TK & Maimoona TN" }),
										/* @__PURE__ */ jsx("span", { children: "together with" }),
										/* @__PURE__ */ jsx("p", { children: "S/o Muhammed NC & Maimoona EP" })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "date-line",
									children: [
										/* @__PURE__ */ jsx("span", { children: "Sunday" }),
										/* @__PURE__ */ jsx("strong", { children: "29" }),
										/* @__PURE__ */ jsxs("span", { children: [
											"November",
											/* @__PURE__ */ jsx("br", {}),
											"2026"
										] })
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "hijri",
									children: "19 Jumada Al-Akhirah 1448"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "hero-venue",
									children: "NC Convention Centre"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "location",
									children: "Pulparamba · Mukkam · Kozhikode"
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "#celebration",
									className: "hero-link",
									children: ["You are lovingly invited ", /* @__PURE__ */ jsx(ArrowDown, { size: 13 })]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hero-foot",
						children: [/* @__PURE__ */ jsx("span", { children: "A new chapter, together." }), /* @__PURE__ */ jsx("span", { children: "29.11.2026" })]
					})
				]
			}),
			/* @__PURE__ */ jsx(InvitationMusic, {
				audioRef,
				active: opened
			}),
			/* @__PURE__ */ jsxs("section", {
				ref: celebrationRef,
				className: "welcome section-wrap",
				id: "celebration",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow",
						children: "Two hearts. One beautiful beginning."
					}),
					/* @__PURE__ */ jsxs("h2", { children: [
						"A day made more beautiful",
						/* @__PURE__ */ jsx("br", {}),
						"with ",
						/* @__PURE__ */ jsx("em", { children: "you." })
					] }),
					/* @__PURE__ */ jsxs("p", {
						className: "welcome-text",
						children: [
							"Together with our families, we warmly invite you to celebrate our Nikah.",
							/* @__PURE__ */ jsx("br", { className: "desktop-break" }),
							" Your presence and duas would mean the world to us."
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flower-mark",
						"aria-hidden": "true",
						children: "❧"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "events",
						children: [
							/* @__PURE__ */ jsxs("article", { children: [
								/* @__PURE__ */ jsx("span", {
									className: "event-number",
									children: "01 / THE PROMISE"
								}),
								/* @__PURE__ */ jsx("h3", { children: "Nikah" }),
								/* @__PURE__ */ jsxs("p", {
									className: "event-time",
									children: ["10:15 ", /* @__PURE__ */ jsx("small", { children: "AM" })]
								}),
								/* @__PURE__ */ jsxs("p", { children: [
									"The beginning of our forever,",
									/* @__PURE__ */ jsx("br", {}),
									"with Allah’s blessings."
								] })
							] }),
							/* @__PURE__ */ jsx("div", {
								className: "event-center",
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx(Heart, {
									size: 23,
									strokeWidth: 1
								})
							}),
							/* @__PURE__ */ jsxs("article", { children: [
								/* @__PURE__ */ jsx("span", {
									className: "event-number",
									children: "02 / THE CELEBRATION"
								}),
								/* @__PURE__ */ jsx("h3", { children: "Reception" }),
								/* @__PURE__ */ jsxs("p", {
									className: "event-time",
									children: [
										"11:00 ",
										/* @__PURE__ */ jsx("small", { children: "AM" }),
										" ",
										/* @__PURE__ */ jsx("span", { children: "—" }),
										" 2:00 ",
										/* @__PURE__ */ jsx("small", { children: "PM" })
									]
								}),
								/* @__PURE__ */ jsxs("p", { children: [
									"Join us for a meal, warm wishes,",
									/* @__PURE__ */ jsx("br", {}),
									"and memories to cherish."
								] })
							] })
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				ref: countdownRef,
				className: "countdown-section",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow",
						children: "Counting the moments"
					}),
					/* @__PURE__ */ jsxs("h2", { children: ["Until our ", /* @__PURE__ */ jsx("em", { children: "forever begins." })] }),
					/* @__PURE__ */ jsx(Countdown, {}),
					/* @__PURE__ */ jsxs("a", {
						className: "button",
						href: googleCalendarUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: handleCalendarClick,
						children: [
							/* @__PURE__ */ jsx(CalendarDays, { size: 16 }),
							" Add to Calendar ",
							/* @__PURE__ */ jsx(ArrowUpRight, { size: 15 })
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "time-note",
						children: "Sunday, 29 November 2026 · All times in IST"
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				ref: venueRef,
				className: "venue section-wrap",
				id: "venue",
				children: [/* @__PURE__ */ jsx("div", {
					className: "venue-art",
					children: /* @__PURE__ */ jsxs("div", {
						className: "venue-arch",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "venue-monogram",
								children: [
									"S ",
									/* @__PURE__ */ jsx("i", { children: "&" }),
									" M"
								]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "eyebrow",
								children: "A celebration of love"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "arch-date",
								children: "29 · 11 · 2026"
							})
						]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "venue-copy",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "eyebrow",
							children: "Meet us here"
						}),
						/* @__PURE__ */ jsxs("h2", { children: [
							"A place to gather.",
							/* @__PURE__ */ jsx("br", {}),
							"A day to ",
							/* @__PURE__ */ jsx("em", { children: "remember." })
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "venue-address",
							children: [/* @__PURE__ */ jsx(MapPin, {
								size: 21,
								strokeWidth: 1.2
							}), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("h3", { children: "NC Convention Centre" }),
								/* @__PURE__ */ jsxs("p", { children: [
									"Pulparamba, Mukkam",
									/* @__PURE__ */ jsx("br", {}),
									"Kozhikode, Kerala"
								] }),
								/* @__PURE__ */ jsx("p", {
									className: "venue-landmark",
									children: "Near Chennamangallur · ~4 km from Mukkam town"
								})
							] })]
						}),
						/* @__PURE__ */ jsxs("a", {
							className: "button",
							href: mapUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							children: ["Get directions ", /* @__PURE__ */ jsx(ArrowUpRight, { size: 16 })]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "venue-note",
							children: "We can’t wait to celebrate with you."
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				ref: closingRef,
				className: "closing",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "little-divider",
						children: [
							/* @__PURE__ */ jsx("span", {}),
							"♡",
							/* @__PURE__ */ jsx("span", {})
						]
					}),
					/* @__PURE__ */ jsx("p", { children: "With love, and the blessings of our families" }),
					/* @__PURE__ */ jsxs("h2", { children: [
						"Safa ",
						/* @__PURE__ */ jsx("em", { children: "&" }),
						" Minhaj"
					] }),
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow",
						children: "Your presence is our most cherished gift."
					}),
					/* @__PURE__ */ jsxs("button", {
						className: "share-button",
						onClick: share,
						children: [shared ? /* @__PURE__ */ jsx(Check, { size: 15 }) : /* @__PURE__ */ jsx(Share2, { size: 15 }), shared ? "Link copied" : "Share the invitation"]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "share-status",
						role: "status",
						children: shareMessage
					})
				]
			})
		] }),
		/* @__PURE__ */ jsxs("footer", { children: [
			/* @__PURE__ */ jsx("span", { children: "S & M" }),
			/* @__PURE__ */ jsx("p", { children: "Made with love, for a lifetime of love." }),
			/* @__PURE__ */ jsx("a", {
				href: "#invitation",
				children: "Back to the invitation ↑"
			})
		] })
	] });
}
export { Home as component };
