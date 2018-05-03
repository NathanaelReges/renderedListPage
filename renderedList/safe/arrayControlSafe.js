/*

    module(arrayOfItems, reverse)

    module
        .array
        .getLength()
        .getItem()
        .add(position, arrayOfNewItems)
    //

    module.listeners
        .unshiftedIndexes(length)
    //
*/




_['renderedList/arrayControl'] = function arrayControl (arrayOfItems, reverse) {

    const module = {}
    
    if(reverse){
        arrayOfItems.reverse()
    }


        
        
    module.array = arrayOfItems


    module.getLength = () => {
        return arrayOfItems.length
    }


    module.getItem = (index) => {
        return arrayOfItems[index]
    }


    module.add = (position,  arrayOfNewItems) => {
        const length = arrayOfNewItems.length
        
        if(reverse){
            arrayOfNewItems.reverse()
        }

        if(position == 'unshift' ){
            module.listeners.unshiftedIndexes(length)
            
            for(let i = length - 1; i >= 0; i--){
                arrayOfItems.unshift(arrayOfNewItems[i])
            }
        
        }
        else{
            for(let i = 0; i < arrayOfNewItems.length; i++){
                arrayOfItems.push(arrayOfNewItems[i])
            }
        }
    }



    
    return module
}




