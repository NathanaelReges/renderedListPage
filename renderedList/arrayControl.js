/*

    module(arrayOfItems, reverse)

    module
        .array
        .getLastIndex()
        .getItem()
        .addTo(position, arrayOfNewItems)
    //

    module.listeners
        .unshiftedIndexes(length)
        .shiftedIndexes(length)
    //
*/




_['renderedList/arrayControl'] = function arrayControl (arrayOfItems, reverse) {

    const module = {}


    if(reverse){
        arrayOfItems.reverse()
    }


        
        
    module.array = arrayOfItems


    module.getLastIndex = () => {
        return arrayOfItems.length -1
    }


    module.getItem = (index) => {
        return arrayOfItems[index]
    }


    module.addTo = (position,  arrayOfNewItems) => {
        if(position != 'start' && position != 'end') return

        const length = arrayOfNewItems.length
        
        if (reverse) {
            arrayOfNewItems.reverse()
        }
        
        
        const positionStart = position == 'start'
        const operation = reverse ?
            positionStart ? 'unshift' : 'shift' :
            positionStart ? 'shift'   : 'unshift'
        //
        
        
        if(operation == 'unshift') {
            module.listeners.unshiftedIndexes(length)
            
            for(let i = length - 1; i >= 0; i--){
                arrayOfItems.unshift(arrayOfNewItems[i])
            }
            
        }
        else{
            module.listeners.shiftedIndexes(length)

            for(let i = 0; i < arrayOfNewItems.length; i++){
                arrayOfItems.push(arrayOfNewItems[i])
            }
        }
    }



    
    return module
}




