import { Arg, Args, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Context } from "../context";
import Movie, { GetMovieArgs } from "../models/Movie";

@Resolver(of => Movie)
export default class MovieResolver {
    
    @Query(returns => [Movie])
    async movies(@Args() {take, skip}: GetMovieArgs, @Ctx() ctx: Context) {
        console.log(take, skip);
        
        return ctx.prisma.movie.findMany({take, skip})
    }

    @FieldResolver()
    imdbId(@Root() movie: Movie) {
        return movie.link.split('/')[5]
    }
}