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
import Movie from "../models/Movie";
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

  @Mutation((returns) => UserList)
  async toggleMovieFromList(
    @Args() { listId, movieId }: ToggleMovieArgs,
    @Ctx() ctx: Context
  ) {
    const finishedMovies = await ctx.prisma.userList.findFirst({
      where: { id: listId },
    }).finishedMovies();

    if (finishedMovies.find(m => m.id === movieId)) {
        return ctx.prisma.userList.update({
          where: { id: listId },
          data: { finishedMovies: { disconnect: { id: movieId } } },
        });
    } else {
        return ctx.prisma.userList.update({
          where: { id: listId },
          data: { finishedMovies: { connect: { id: movieId } } },
        });
    }

  }

  @FieldResolver((returns) => [Movie])
  async finishedMovies(@Root() userList: UserList, @Ctx() ctx: Context) {
    return ctx.prisma.userList
      .findFirst({ where: { id: userList.id } })
      .finishedMovies();
  }

  @FieldResolver((returns) => [Movie])
  async unwatchedMovies(@Root() userList: UserList, @Ctx() ctx: Context) {
    const finishedMovies = await ctx.prisma.userList
      .findFirst({ where: { id: userList.id } })
      .finishedMovies();
    return ctx.prisma.movie.findMany({
      where: { id: { notIn: finishedMovies.map((i) => i.id) } },
    });
  }
}
