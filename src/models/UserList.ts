import { ArgsType, Field, Int, ObjectType } from "type-graphql";
import { ListMovie } from "./Movie";

@ObjectType()
export default class UserList {
  @Field()
  id: string;

  @Field((type) => [ListMovie])
  movies: ListMovie[];
}

@ArgsType()
export class ToggleMovieArgs {
  @Field()
  listId: string;

  @Field((type) => Int)
  movieId: number;
}
