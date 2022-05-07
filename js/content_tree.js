export class ContentTree {
    content_tree = {}

    constructor(data) {
        this.content_tree = data;
    }

    list_category() {
        var categories = []
        for (var category of this.content_tree) {
            categories.push({ "category": Object.keys(category)[0] });
        }
        categories = { "categorys": categories };
        return categories;
    }

    get_all_clips() {
        var clips = { "clips": this.content_tree[0]["japanese"] };
        return clips;
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