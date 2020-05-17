import firebase from 'firebase';


export function getCategory(){

    let array = []
    firebase.database().ref('category').on('value', (data) => {
        for(let i in data.toJSON()){
            array.push(data.toJSON()[i])
        }
    })
    return array;
}

export function getDataByCategory(category){
    let array = [];
    firebase.database().ref('vacancy/'+category).on('value',(data) => {
        for(let i in data.toJSON()){
            array.push(data.toJSON()[i])
        }
    })
    return array;
}

export function getCategoryCount(category){

    let count = 0;
    firebase.database().ref('vacancy/'+category).on('value',(data) => {
        count = data.numChildren();
    })
    return count;
}


export function getCurrentViews(id){

    let view = 0
    firebase.database().ref('post/'+id).on('value',(data) => {
        view = data.toJSON()['views']
    })
    return view;
}

export function getCurrentLikes(id){

    let likes = 0
    firebase.database().ref('post/'+id).on('value',(data) => {
        likes = data.toJSON()['like']
    })

    return likes;
}

export function getCurrentShares(id){

    let shares = 0
    firebase.database().ref('post/'+id).on('value',(data) => {
        shares = data.toJSON()['share']
    })

    return shares;
}

export function getCurrentRating(id){

    let rating = 0
    firebase.database().ref('post/'+id).on('value',(data) => {
        rating = data.toJSON()['rate']
    })

    return rating;
}

export function getAllPostData(){

    let array = [];
    firebase.database().ref('post').on('value', (data) => {
        isLoading =  true;
        for(let i in data.toJSON()){
            array.push(data.toJSON()[i])
        }
    });
    return array;
}

export function getAllSlider(){
    let array = [];
    firebase.database().ref('slider').on('value',(data) => {
        for(let i in data.toJSON()){
            array.push(data.toJSON()[i])
        }
    });
    return array;
}

export function getSliderImageArray(array){
    let imageArry = [];
    for(let i = 0; i < array.length; i++){
        imageArry.push(array[i].imageArry)
    }
    return imageArry;
}