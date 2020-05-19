import { Pre, prop, getModelForClass } from '@typegoose/typegoose';
import { Base } from './base.model';

@Pre<Article>(`save`, function() {
    this.updatedAt = new Date();
})
export class Article extends Base {
    @prop({
        default: `新建文章`
    })
    title!: string;

    @prop({
        default: ''
    })
    content!: string;

    @prop({
        default: null
    })
    type!: string | null;

    @prop({
        default: null
    })
    tag!: string | null;

    @prop({
        default: false
    })
    published!: boolean;
}

export const ArticleModel = getModelForClass(Article);
