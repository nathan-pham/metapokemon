export const Button = ({ children, className="", ...props }) => (
    <button className={ "px-3 py-2 rounded-lg text-white bg-blue-600 disabled:bg-blue-500 disabled:cursor-wait " + className } { ...props }>{ children }</button>
)