//holds coordinates of points on canvas
var xCoor = [0];
var yCoor = [0];
//holds coordinates of points ordered according to the tour 
//as the tour is built, points are added to these arrays
var xTour = [0];
var yTour = [0];

$(document).ready( function() {

	$("#canvas").click( function() {
		
		//get context of canvas
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		//get context of second canvas
		var canvas2 = $("#canvas2").get(0);
		var ctx2 = canvas2.getContext("2d");
		//add point to canvas 
		ctx.fillRect(event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop,5,5);
		ctx2.fillRect(event.pageX-canvas.offsetLeft,event.pageY-canvas.offsetTop,5,5);

		
		//add point to arrays
		xCoor.push(event.pageX);
		yCoor.push(event.pageY);
	
	});

	$("#button1").click( function() {
		
		//do algorithm
		//why does it sometimes change the start?
		xTour[0] = xCoor[0];
		yTour[0] = yCoor[0];
		for ( var i = 1; i < xCoor.length; i++ ) {
			var minDis = Number.MAX_VALUE;
			index = 0;
			for ( var j = 0; j < xTour.length; j++ ) {
				var dis = Math.sqrt( Math.pow(xTour[j]-xCoor[i], 2) + Math.pow(yTour[j]-yCoor[i], 2) );
				if ( dis < minDis ) {
					index = j;
					minDis = dis;
				}
			}
			xTour.splice(index+1, 0, xCoor[i] );
			yTour.splice(index+1, 0, yCoor[i] );
			//console.log("hi_");
		}
		
		//draw lines between points
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");	
		ctx.strokeStyle = "#55C"; //change color of line
		ctx.lineWidth = 3; //change width of line
		
		for ( var i = 0; i < yTour.length; i++ )
		{
			console.log(xTour[i]);
		}


		//draw a line between every point
		for ( var i = 1; i < xTour.length-1; i++ )
		{
			ctx.beginPath();
			ctx.moveTo(xTour[i]-5, yTour[i]-56);
			ctx.lineTo(xTour[i+1]-5,yTour[i+1]-56);
			ctx.stroke(); 

		}

		graph(); 
	});

function graph() {

	//do algorithm
	xTour = [];
	yTour = [];
	xTour[0] = xCoor[0];
	yTour[0] = yCoor[0];
	for ( var i = 1; i < xCoor.length; i++ ) {
		var minInc = Number.MAX_VALUE;
		index = 0;
		for ( var j = 0; j < xTour.length; j++ ) {
			if ( j == xTour.length-1 )
				getLastInc(j, i ); 
			else
				var inc = getInc( j, i ); 
			console.log(inc);
			if ( inc < minInc ) {
				index = j;
				minInc = inc;
			}
		}
		xTour.splice(index+1, 0, xCoor[i] );
		yTour.splice(index+1, 0, yCoor[i] );
		//console.log("hi_");
	}
		
	//draw lines between points
	var canvas2 = $("#canvas2").get(0);
	var ctx = canvas2.getContext("2d");	
	ctx.strokeStyle = "#55C"; //change color of line
	ctx.lineWidth = 3; //change width of line
		
	for ( var i = 0; i < yTour.length; i++ )
	{
		console.log(xTour[i]);
	}


	//draw a line between every point
	for ( var i = 1; i < xTour.length-1; i++ )
	{
		ctx.beginPath();
		ctx.moveTo(xTour[i]-5, yTour[i]-56);
		ctx.lineTo(xTour[i+1]-5,yTour[i+1]-56);
		ctx.stroke(); 

	}

}

	//doesn't serve any purpose right now, since I got rid of button2. Duplicate code of Smallest Increase. 
	$("#button2").click( function() {
		
		//do algorithm
		xTour[0] = xCoor[0];
		yTour[0] = yCoor[0];
		for ( var i = 1; i < xCoor.length; i++ ) {
			var minInc = Number.MAX_VALUE;
			index = 0;
			for ( var j = 0; j < xTour.length; j++ ) {
				if ( j == xTour.length-1 )
					getLastInc(j, i ); 
				else
					var inc = getInc( j, i ); 
				console.log(inc);
				if ( inc < minInc ) {
					index = j;
					minInc = inc;
				}
			}
			xTour.splice(index+1, 0, xCoor[i] );
			yTour.splice(index+1, 0, yCoor[i] );
			//console.log("hi_");
		}
		
		//draw lines between points
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");	
		ctx.strokeStyle = "#55C"; //change color of line
		ctx.lineWidth = 3; //change width of line
		
		for ( var i = 0; i < yTour.length; i++ )
		{
			console.log(xTour[i]);
		}


		//draw a line between every point
		for ( var i = 1; i < xTour.length-1; i++ )
		{
			ctx.beginPath();
			ctx.moveTo(xTour[i]-5, yTour[i]-5);
			ctx.lineTo(xTour[i+1]-5,yTour[i+1]-5);
			ctx.stroke(); 

		}
	});

});

/*
	Returns the increase in distance caused by adding a new point after another point. 
	Adds distance from new point to both point before and point after. Substracts direct distance from point before to point after. Returns value. 

*/ 
function getInc( index, newIndex ) {

	var inc = getDistance(xTour[index],xCoor[newIndex],yTour[index],yCoor[newIndex]);

	inc += getDistance(xCoor[newIndex],xTour[index+1],yCoor[newIndex],yTour[index+1]);
	console.log( xTour[index+1] + "!");
	inc -= getDistance(xTour[index],xTour[index+1],yTour[index],yTour[index+1]);

	return inc;
}

/*
	Returns the increase when adding to the end of the tour. 
	Returns the distance from the last point to the new point. 
*/
function getLastInc( index, newIndex ) {

	var inc = getDistance(xCoor[newIndex],xTour[index],yCoor[newIndex],yTour[index]);

	console.log( inc + "lll");

	return inc;
}

/*
	Calculates the distance formula. 
*/
function getDistance( x1, x2, y1, y2 ) {

	return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2));

}


