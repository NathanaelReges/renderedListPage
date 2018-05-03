_['tools/myFrame'] = (function createMyFrame () {

    let arrayOfFrameObjs = [createFrameObj(), createFrameObj(), createFrameObj()],
    requestedTest = false


    const module = {}


    module.response = (fun, stage) => {
        add(arrayOfFrameObjs[0], fun, stage)
    }

    module.next = (fun, stage) => {
        add(arrayOfFrameObjs[1], fun, stage)
    }

    module.last = (fun, stage) => {
        add(arrayOfFrameObjs[2], fun, stage)
    }
    

    return module




    function createFrameObj () {
        return {read: [], write: [], isEmpty: true}
    }
    

    function add (frameObj, fun, stage = 'write') {

        if(stage == 'read') {
            frameObj.read.push(fun)
        }
        else 
        if(stage == 'write') {
            frameObj.write.push(fun)
        }

        if(frameObj.isEmpty) {
            frameObj.isEmpty = false
        }  

        if(!requestedTest){
            requestedTest = true
            requestAnimationFrame(test)
        }

    }



    function test () {
        let testIndex = 0,
        foundPopulatedFrame = false,
        populatedFrameIndex = undefined



        do{
            var currentFrameObj = arrayOfFrameObjs[testIndex]
            
            if(currentFrameObj.isEmpty) {
                testIndex++
            }
            else {
                foundPopulatedFrame = true
                populatedFrameIndex = testIndex
                break; 
            }   
        }
        while(testIndex <= 2)
    


        if(foundPopulatedFrame){
            consumeFrameObj(populatedFrameIndex)            
            requestAnimationFrame(test)
        }
        else{
            requestedTest = false
        }
        
    }
    


    function consumeFrameObj (frameObjIndex){

        const currentFrameObj = arrayOfFrameObjs[frameObjIndex]
        arrayOfFrameObjs[frameObjIndex] = createFrameObj()

        const arrayOfReadFuns = currentFrameObj.read
        const arrayOfWriteFuns = currentFrameObj.write
        

        while (arrayOfReadFuns.length) {
            arrayOfReadFuns.shift()()
        }
        
        while (arrayOfWriteFuns.length) {
            arrayOfWriteFuns.shift()()
        }

    }

    
})()