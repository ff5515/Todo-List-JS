const addBtn = document.getElementById('add');
    
addBtn.addEventListener('click', () => {
    let newInput = 
        document.getElementById('input-new').value;
        // console.log(newInput)  
        
        const data = { 
           userId: 1,
            title: newInput,
            completed: false };
        

        fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('input-new').value = '';
            
            document.getElementById('todolist').insertAdjacentHTML('afterbegin',
            `<label id="L${data.id}" for="${data.id}"class="comment">NEW</label>
            <div id="${data.id}" class="list-item-new">${data.title}</div>`)

            let newItems = document.getElementById(data.id);
            let newLabel = document.getElementById(`L${data.id}`)

                if (newItems.classList.contains('list-item-new')) {
                    newItems.addEventListener('click', () => {
                        newItems.classList = 'list-item-done';
                        newLabel.innerText = 'DONE';
                    })
                    
                } 
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    })


    // function todoList()  {

    fetch('https://jsonplaceholder.typicode.com/todos')
.then(response => { response.json()
    .then(data => { 
        
        data.map(item => {
            if (item.completed === false) {
                //Picking new added items
                document.getElementById('todolist').insertAdjacentHTML('afterbegin',
                `<label id="L${item.id}" for="${item.id}"class="comment">NEW</label>
                <div id="${item.id}" class="list-item-new">${item.title}</div>`
                )
                
            } else if (item.completed === true) {
                //Picking done items
                document.getElementById('todolist').insertAdjacentHTML('afterbegin',
                `<label id="L${item.id}" for="${item.id}"class="comment">DONE</label>
                <div id="${item.id}" class="list-item-done">${item.title}</div>`)
            } 
            //Marking done items and changing label from 'new' to 'done'
            let newItems = document.getElementById(item.id);
            let newLabel = document.getElementById(`L${item.id}`)
            
            if (newItems.classList.contains('list-item-new')) {
                newItems.addEventListener('click', () => {
                    newItems.classList = 'list-item-done';
                    newLabel.innerText = 'DONE';
                })
                
            } 
            
            // console.log(item)
        })
        })})
        .catch(function(err) {
            console.log('Fetch Error :-S', err);});
        
    // }
    
    // todoList()