import { createContext } from "react"

// true until the first client-side navigation, so only the landing page gets the full entrance
const MotionContext = createContext<{ firstLoad: boolean }>({ firstLoad: true })

export default MotionContext
