import { Movie } from "../types"
import Hero from "./Hero/Hero"

const Home = ({movies}:{movies:Movie[]}) => {
    return (
        <Hero movies={movies} />
    )
}

export default Home