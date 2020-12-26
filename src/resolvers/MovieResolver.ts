import { Arg, Args, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import Movie, { GetMovieArgs } from "../models/Movie";

@Resolver(of => Movie)
export default class MovieResolver {
    
    @Query(returns => [Movie])
    async movies(@Args() {take, skip}: GetMovieArgs, @Ctx() ctx: Context) {
        console.log(take, skip);
        
        return ctx.prisma.movie.findMany({take, skip})
    }
}