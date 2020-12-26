import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Context } from "../context";
import Movie, { ListMovie } from "../models/Movie";
import UserList, { ToggleMovieArgs } from "../models/UserList";

@Resolver((of) => UserList)
export default class UserListResolver {
  @Query((returns) => UserList)
  async userList(@Arg("id") id: string, @Ctx() ctx: Context) {
    return ctx.prisma.userList.findFirst({ where: { id } });
  }

  @Mutation((returns) => UserList)
  async createUserList(@Ctx() ctx: Context) {
    return ctx.prisma.userList.create({ data: {} });
  }

  @Mutation((returns) => Boolean)
  async toggleMovieFromList(
    @Args() { listId, movieId }: ToggleMovieArgs,
    @Ctx() ctx: Context
  ) {
    const finishedMovies = await ctx.prisma.userList
      .findFirst({
        where: { id: listId },
      })
      .finishedMovies();

    if (finishedMovies.find((m) => m.id === movieId)) {
      await ctx.prisma.userList.update({
        where: { id: listId },
        data: { finishedMovies: { disconnect: { id: movieId } } },
      });
      return false;
    } else {
      await ctx.prisma.userList.update({
        where: { id: listId },
        data: { finishedMovies: { connect: { id: movieId } } },
      });
      return true;
    }
  }

  @FieldResolver((returns) => [ListMovie])
  async movies(@Root() userList: UserList, @Ctx() ctx: Context) {
    const finishedMovies = (
      await ctx.prisma.userList
        .findFirst({ where: { id: userList.id } })
        .finishedMovies()
    ).map((m) => m.id);
    const movies = await ctx.prisma.movie.findMany();

    return movies.map((movie) => ({
      ...movie,
      watched: finishedMovies.includes(movie.id),
    }));
  }
}
