const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1a0606565dmsh0066cc5ca89312bp116a79jsn5562cd5420f5',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

/*
var loader= document.getElementById("preloader");

function displayloading(){
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    },5000);
}

function hideloading() {
     loader.classList.remove("display");
}
*/



async function getRecipe(id) {
	let data = null;
	let url = 'https://tasty.p.rapidapi.com/recipes/get-more-info?id='+id;
	await fetch(url, options)
	.then(response => response.json())
	.then(response => {
        data = response;
        //console.log(response);
    })
	.catch(err => console.error(err));
	//console.log('kjasdbnj',`aknxmbzsncjnlckajbka`);
	console.log(data);
	document.getElementById("preloader").remove();
	showRecipe(data);
	//createRecipe()
}

async function getRecipeList(from,tag) {
	let url = 'https://tasty.p.rapidapi.com/recipes/list?from=' + from + '&size=30';
	if(tag !== '')
	{
		url += '&tags='+tag;
	}
	if(q !== '')
	{
		url += '&q='+q;
	}
	let data = null;
	//displayloading();
	await fetch(url, options)
	.then(response => response.json())
	.then(response => {
        data = response;
        //console.log(response);
    })
	.catch(err => console.error(err));
	//console.log('kjasdbnj',`aknxmbzsncjnlckajbka`);
	console.log("ok");
	//hideloading();
	showRecipeList(data.results);
	document.getElementById("preloader").remove();
	//console.log('kjasdbnj',`aknxmbzsncjnlckajbka`);
	//document.getElementById('123').innerHTML += '<p class="ahc">'+data.des+'</p>';
	//createRecipe()
}

function showRecipe(data){
	document.getElementById('name').innerHTML += data.name;
	document.getElementById('thumbnail_url').src = data.thumbnail_url;
	for(let i=0;i<data.instructions.length;i++)
	{
		document.getElementById('instructions').innerHTML += '<li>'+data.instructions[i].display_text+'</li>';
	}
	document.getElementById('ingredients').innerHTML += '';
	for(let i=0;i<data.sections[0].components.length;i++)
	{
		document.getElementById('ingredients').innerHTML += '<li>'+data.sections[0].components[i].raw_text+'</li>';
	}
	document.getElementById('description').innerHTML += data.description;
	document.getElementById('yields').innerHTML += data.yields;
	document.getElementById('save').innerHTML += '<input type="hidden" name="name" value="'+data.name+'" />';
	document.getElementById('save').innerHTML += '<input type="hidden" name="img" value="'+data.thumbnail_url+'" />';
	document.getElementById('postcomment').innerHTML += '<input type="hidden" name="recipeName" value="'+data.name+'" />'
	/*
	for(let i=0;i<data.nutrition.length;i++)
	{
		document.getElementById('nutrition').innerHTML += '<li>'+data.nutrition[i]+'</li>';
	}
	*/
	for(let i=0;i<data.tags.length;i++)
	{
		document.getElementById('tags').innerHTML += '<li>'+data.tags[i].display_name+'</li>';
		//name also include
	}
	//document.getElementById('video_url').innerHTML += '<embed src="'+data.video_url+'">';
}

function showRecipeList(data){
	for(let i=0;i<data.length;i++)
	{
		if(Object.keys(data[i]).length == 52)
		{
			let content = '<li class="card"><img class="card-img-top" src="'+data[i].thumbnail_url+'">';
			content += '<div class="card-body" id="recipesaved"><a href="/'+data[i].id+'" style="text-decoration:none;color:#2d2d2d"><strong>'+data[i].name+'</strong></a>';
			content += '</div></li>';
			document.getElementById('lists').innerHTML += content;
		}
		else if(Object.keys(data[i]).length == 28)
		{
			let content = '<li class="card"><img class="card-img-top" src="'+data[i].recipes[0].thumbnail_url+'">';
			content += '<div class="card-body" id="recipesaved"><a href="/'+data[i].recipes[0].id+'" style="text-decoration:none;color:#2d2d2d"><strong>'+data[i].recipes[0].name+'</strong></a>';
			content += '</div></li>';
			document.getElementById('lists').innerHTML += content;
		}
	}
}