import { getModelForClass, prop, Pre } from '@typegoose/typegoose';
import { Base } from './base.model';
@Pre<Comment>(`save`, function() {
    this.updatedAt = new Date();
})
export class Comment extends Base {
    @prop({
        trim: true,
        required: true
    })
    content!: string;

    @prop({
        required: true
    })
    articleId!: string;

    @prop({ default: `John Doe` })
    user!: string;

    @prop({ default: true })
    published!: boolean;
}

export const CommentModel = getModelForClass(Comment);
