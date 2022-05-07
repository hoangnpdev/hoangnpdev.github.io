export class ContentTree {
    content_tree = {}

    constructor(data) {
        this.content_tree = data;
    }

    list_category() {
        var categories = [];
        // for (var category of this.content_tree) {
        //     categories.push({ "category": Object.keys(category)[0] });
        // }
        for (var category of Object.keys(this.content_tree))
            categories.push({ "category": category })
        categories = { "categorys": categories};
        return categories;
    }

    get_all_clips() {
        var categories = Object.keys(this.content_tree)
        var result = []
        for (var category of categories)
            result = result.concat(this.content_tree[category])
        return {"clips": result};
    }

    get_category_clips(category) {
        return {"clips": this.content_tree[category]}
    }

    find_clips_by_keyword(word) {
        console.log("searching.." + word)
        var result = {};
        var clips = this.get_all_clips().clips;
        var filtered_clips = [];
        if (word !== '') {
            filtered_clips = clips.filter(clip => clip.title.includes(word));
        }
        result = {"clips": clips};
        if (filtered_clips.length > 0)
            result = {"clips": filtered_clips};
        return result;
    }

    show() {
        console.log("hello world");
    }

}