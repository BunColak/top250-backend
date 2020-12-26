import { ArgsType, Field, Int } from "type-graphql";

const DEFAULT_LIMIT = 10;

@ArgsType()
export class ListArgs {
  @Field(type => Int, { defaultValue: 0 })
  skip: number;
  
  @Field(type => Int, { defaultValue: DEFAULT_LIMIT, description: "Returned item count" })
  take: number;

  get startIndex(): number {
    return this.skip;
  }
  get endIndex(): number {
    return this.skip + this.take;
  }
}
