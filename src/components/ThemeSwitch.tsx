import { ChangeEvent, useEffect, useState } from "react"

const ThemeSwitch = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.checked ? 'dark' : 'light')
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <div className="container-switch">
            <label className="switch">
                <input type="checkbox" onChange={handleChange} checked={theme === 'dark'}/>
                <span className="slider"></span>
            </label>
        </div>);
}

export default ThemeSwitch;