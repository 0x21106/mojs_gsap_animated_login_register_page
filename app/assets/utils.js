import { gsap, TimelineLite } from './gsap/all.js';
import { SplitText } from './splitText.js';

export class Utils {
    constructor() {
        this.blockedOperation = false;
        this.views = {
            register_view: "register",
            login_view: "login",
        }
        this.options = {
            currentView: this.views.register_view
        }
    }


    hidePreloader() {
        const preloader = document.querySelector("#preloader")
        return gsap.to(preloader, 1.5, {
            ease:'expo.inOut',
            yPercent:-100,
            opacity:0,
        })
    }

    changeView(view) {
        if (!this.blockedOperation) {
            const registerTitleTimeline = new TimelineLite()
            const registerDescriptionTimeline = new TimelineLite()

            const loginTitleTimeline = new TimelineLite()
            const loginDescriptionTimeline = new TimelineLite()

            const canvasSlider = this.canvasSlider

            const currentFormElements = this.formElements

            if (view == this.views.login_view) {
                this.options.currentView = this.views.login_view
                const formChildren = this.formElements
                const loginFormTimeline = new TimelineLite()
                const registerFormTimeline = new TimelineLite()

                this.hideTexts(this.options.register.title.chars, registerTitleTimeline, 0.3, 0.01)
                this.hideTexts(this.options.register.description.chars, registerDescriptionTimeline, 0.2, 0.01)

                registerFormTimeline.staggerTo(
                    currentFormElements,
                    0.2,
                    {
                        y: -20,
                        rotateX: -45,
                        opacity: 0,
                    },
                    0.01
                )
                registerFormTimeline.set(document.querySelector("form.register-form"), {
                    display: 'none'
                })

                gsap.set(this.options.login.title.chars, {
                    opacity: 0
                })

                gsap.set(this.options.login.description.chars, {
                    opacity: 0
                })

                gsap.to(canvasSlider, 1.5, {
                    ease: 'expo.in',
                    scale: 5
                }).delay(0.7)

                gsap.to(canvasSlider, 2.5, {
                    xPercent: 100,
                    ease: 'expo.out',
                    scale: 1,
                }).delay(2.1)

                this.showTexts(this.options.login.title.chars, loginTitleTimeline, 1, 0.03, 3.5)
                this.showTexts(this.options.login.description.chars, loginDescriptionTimeline, 0.5, 0.015, 3.5)

                loginFormTimeline.set(document.querySelector("form.login-form"),
                    {
                        display: "block"
                    }).delay(3.5)

                loginFormTimeline.staggerFromTo(formChildren, 0.5,
                    {
                        y: -30,
                        rotateX: -45,
                        opacity: 0
                    }, {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                }, 0.01)

            }
            else if (view == this.views.register_view) {
                this.options.currentView = this.views.register_view
                const formChildren = this.formElements
                const registerFormTimeline = new TimelineLite()
                const loginFormTimeline = new TimelineLite()

                this.hideTexts(this.options.login.title.chars, loginTitleTimeline, 0.3, 0.01)
                this.hideTexts(this.options.login.description.chars, loginDescriptionTimeline, 0.2, 0.01)

                loginFormTimeline.staggerTo(
                    currentFormElements,
                    0.2,
                    {
                        y: -20,
                        rotateX: -45,
                        opacity: 0,
                    },
                    0.01
                )

                loginFormTimeline.set(document.querySelector("form.register-form"), {
                    display: 'none'
                })

                gsap.set(this.options.register.title.chars, {
                    opacity: 0
                })

                gsap.set(this.options.register.description.chars, {
                    opacity: 0
                })

                gsap.to(canvasSlider, 1.5, {
                    ease: 'expo.in',
                    scale: 5
                }).delay(0.7)

                gsap.to(canvasSlider, 2.5, {
                    xPercent: 0,
                    ease: 'expo.out',
                    scale: 1,
                }).delay(2.1)

                this.showTexts(this.options.register.title.chars, registerTitleTimeline, 1, 0.03, 3.5)
                this.showTexts(this.options.register.description.chars, registerDescriptionTimeline, 0.5, 0.015, 3.5)

                registerFormTimeline.set(document.querySelector("form.register-form"),
                    {
                        display: "block"
                    }).delay(3.5)

                registerFormTimeline.staggerFromTo(formChildren, 0.5,
                    {
                        y: -30,
                        rotateX: -45,
                        opacity: 0
                    }, {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                }, 0.01)
            }
        }
    }

    showTexts(text, timeline, duration, iteration, delay = 0) {
        this.blockedOperation = true
        const from = {
            opacity: 0
        }
        const to = {
            opacity: 1
        }
        timeline.staggerFromTo(text, duration, from, to, iteration).delay(delay).then(() => {
            this.blockedOperation = false
        })
    }

    hideTexts(text, timeline, duration, iteration, delay = 0) {
        this.blockedOperation = true
        const to = {
            opacity: 0
        }
        timeline.staggerTo(text, duration, to, iteration).delay(delay).then(() => {
            this.blockedOperation = false
        })
    }

    get formElements() {
        const elements = []
        const view = this.options.currentView
        if (view == this.views.register_view) {
            const form = document.querySelector("form.register-form")

            form.childNodes.forEach(node => {
                if (node.nodeName !== "#text") {
                    elements.push(node)
                }
            })
        }
        else if (view == this.views.login_view) {
            const form = document.querySelector("form.login-form")

            form.childNodes.forEach(node => {
                if (node.nodeName !== "#text") {
                    elements.push(node)
                }
            })
        }
        return elements
    }

    get canvasSlider() {
        const slider = document.querySelector("#blob-wave-slider")
        return slider
    }

    get title() {
        const view = this.options.currentView
        if (view === this.views.register_view) {
            return document.querySelector(".register-view .view-title")
        }
    }

    get description() {
        const view = this.options.currentView
        if (view === this.views.register_view) {
            return document.querySelector(".register-view .view-description")
        }
    }


    init() {
        const formTimeline = new TimelineLite()
        const titleTimeline = new TimelineLite()
        const descriptionTimeline = new TimelineLite()

        const currentFormElements = this.formElements
        const canvasSlider = this.canvasSlider


        for (let view in this.views) {
            let tempView = document.querySelector(`.${this.views[view]}-view`)
            this.options[this.views[view]] = {}
            for (let child of tempView.children) {
                if (child.classList.contains('view-title')) {
                    this.options[this.views[view]]['title'] = new SplitText(child, ['words', 'chars'])
                }
                else if (child.classList.contains('view-description')) {
                    this.options[this.views[view]]['description'] = new SplitText(child, ['words', 'chars'])
                }
            }
        }

        const description = this.description

        document.querySelector("#app").style.visibility = "visible"

        gsap.fromTo(
            canvasSlider,
            1.5,
            {
                yPercent: -100,
                xPercent: -100
            },
            {
                ease: 'expo.out',
                yPercent: 0,
                xPercent: 0
            }
        )

        this.showTexts(this.options.register.title.chars, titleTimeline, 1, 0.05, 0.7)
        this.showTexts(this.options.register.description.chars, descriptionTimeline, 0.5, 0.03, 0.7)

        formTimeline.staggerFromTo(
            currentFormElements,
            0.5,
            {
                y: -30,
                opacity: 0,
                rotateX: 45,
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
            },
            0.03
        ).delay(1)


    }

}