$(document).ready(function(){
$("#submbttn").click(function () {
	 var movie = $("#textbox").val();
	 $.get("./api/"+movie,function(data) 
		{ 
			var x = JSON.stringify(data.Title);
            var y = JSON.stringify(data.Year);
            var z = JSON.stringify(data.Poster);
			var images = '<img src=' + z +  ' />';
			
			document.getElementById( 'democon2' ).innerHTML = images;

            $( "#democon" ).html(x); 
			$( "#democon1" ).html(y);
		},"json");
		});
});
	 
