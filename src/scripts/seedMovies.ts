import movies from "../assets/movies.json";
import { PrismaClient } from '@prisma/client'


const seedMovies = async () => {
    const prisma = new PrismaClient()
    
    for(const movie in movies) {
        try {
            await prisma.movie.create({
                data: {
                    title: movies[movie].title,
                    imdbRating: movies[movie].rating,
                    link: movies[movie].link
                }
            })
        } catch(e) {
            console.log(e);
            
        }
    }

};

seedMovies()
