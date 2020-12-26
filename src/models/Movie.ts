import { ArgsType, Field, Int, ObjectType } from "type-graphql";
import { ListArgs } from "./Commons";

@ObjectType()
export default class Movie {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  imdbRating: number;

  @Field()
  link: string;

  @Field()
  imdbId: string;
}

@ObjectType()
export class ListMovie extends Movie {
  @Field()
  watched: boolean
}

@ArgsType()
export class GetMovieArgs extends ListArgs {}
