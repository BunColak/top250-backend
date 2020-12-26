import { ArgsType, Field, Int, ObjectType } from "type-graphql";
import Movie from "./Movie";

@ObjectType()
export default class {
  @Field()
  id: string;

  @Field((type) => [Movie])
  finishedMovies: Movie[];

  @Field((type) => [Movie])
  unwatchedMovies: Movie[];
}

@ArgsType()
export class ToggleMovieArgs {
  @Field()
  listId: string;

  @Field((type) => Int)
  movieId: number;
}
