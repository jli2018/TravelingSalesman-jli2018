import java.util.ArrayList;

public class PoorTSalesman
{
	private ArrayList<Vertex> vertices;

	public PoorTSalesman()
	{
		vertices = new ArrayList<Vertex>();
	}

	public void addVertex( Vertex v )
	{
		vertices.add( v );
	}

	//tested, works fine
	public void connect()
	{
		for ( int i = 0; i < vertices.size(); i++ )
		{
			//at the first vertex, connect to all other vertices
			for ( int j = 0; j < i; j++ )
			{
				int r = 1 + (int)(Math.random() * 100); 
				vertices.get(i).add( vertices.get(j), r );
			}
			for ( int k = i+1; k < vertices.size(); k++ )
			{
				int r = 1 + (int)(Math.random() * 100); 
				vertices.get(i).add( vertices.get(k), r );
			}
		}
	}

	//why not include <E> in parameters and return types??
	//says closest may not be initialized
	//@SuppressWarnings("unchecked") 
	public Vertex findNext( Vertex v )
	{
		//starts at a point, looks for other unreached vectors, finds the one with the least weight
		//returns vertex with lowest weight??
		//why not have the <E>?????
		Vertex closest = null;
		int weight = Integer.MAX_VALUE;
		for ( int i = 0; i < v.numEdges(); i++ )
		{
			if ( !v.getEdge(i).isVisited() && v.getEdgeCost(i) < weight )
			{
				weight = v.getEdgeCost(i);
				closest = v.getEdge(i); 
			}
		}

		//or if closest == null
		if ( weight == Integer.MAX_VALUE )
			return null;
		System.out.println( weight );
		//closest.setVisited( true );
		return closest;

	}

	//method starts with one Vertex, continuously traverse along closest Vertices, print name and weight, stop when there are no more unreached Vertices
	public void traverse( Vertex curr )
	{
		//boolean incomplete = true; 
		while ( curr != null )
		{
			//mark current Vertex as visited
			curr.setVisited( true );
			//print curr info
			System.out.println( "Name: " + curr.getValue() );
			curr = findNext( curr ); 
		}

	}


	public static void main( String[] args )
	{
		PoorTSalesman pts = new PoorTSalesman(); 

		Vertex v1 = new Vertex( "City1" ); 
		Vertex v2 = new Vertex( "City2" ); 
		Vertex v3 = new Vertex( "City3" ); 
		Vertex v4 = new Vertex( "City4" ); 
		Vertex v5 = new Vertex( "City5" ); 
		pts.addVertex( v1 ); 
		pts.addVertex( v2 ); 
		pts.addVertex( v3 ); 
		pts.addVertex( v4 ); 
		pts.addVertex( v5 ); 

		pts.connect();

		/*
		//for testing connect()
		ArrayList<Vertex> vl = v5.getEdgeList(); 
		for ( int i = 0; i < vl.size(); i++ )
		{
			System.out.println( vl.get(i) );
			//System.out.println( "!" );
		}
		*/

		pts.traverse( v1 );

	}





}