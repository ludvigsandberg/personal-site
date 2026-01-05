import './style.css'

const MAX_TILT = 6 // degrees (keep small for realism)
const HOVER_SCALE = 1.02

const cards = document.querySelectorAll<HTMLElement>('.tilt-test')

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 120ms ease-out'
    })

    card.addEventListener('mousemove', () => {
        const rect = card.getBoundingClientRect()

        // Viewport center
        const viewportCenterX = window.innerWidth / 2
        const viewportCenterY = window.innerHeight / 2

        // Card center
        const cardCenterX = rect.left + rect.width / 2
        const cardCenterY = rect.top + rect.height / 2

        // Offset from viewport center (-1 to 1 range)
        const offsetX = (cardCenterX - viewportCenterX) / viewportCenterX
        const offsetY = (cardCenterY - viewportCenterY) / viewportCenterY

        // Clamp for safety
        const tiltX = clamp(-offsetY * MAX_TILT, -MAX_TILT, MAX_TILT)
        const tiltY = clamp(offsetX * MAX_TILT, -MAX_TILT, MAX_TILT)

        card.style.transform = `
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale(${HOVER_SCALE})
    `
    })

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 240ms ease-in-out'
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
    })
})
