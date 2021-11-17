import Wrapper from "@/components/Wrapper"
import Header from "@/components/Header"

const App = () => {
    return (
        <>
            <Wrapper>
                <Header />

                <img className="max-w-full rounded-xl mt-4" src={ dragoniteSrc } />
            </Wrapper>
        </>
    )
}

export default App