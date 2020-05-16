import { Pre, prop, getModelForClass } from '@typegoose/typegoose';
import base from './base.model';

@Pre<Article>(`save`, function () {
    this.updatedAt = new Date();
})
export class Article extends base{
    @prop({
        required: true
    })
    title!: string;

    @prop({
        default: ''
    })
    content!: string;

    @prop({
        required: true
    })
    type!: string;

    @prop({
        required: true
    })
    tag!: string;

    @prop({
        default: false
    })
    published!: boolean;
}

export const ArticleModel = getModelForClass(Article);
