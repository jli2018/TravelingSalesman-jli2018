import java.util.ArrayList;


public class Vertex<E>
{
	//need a value
	private E value;
	//list of edges
	private ArrayList<Vertex> edges;
	//list of cost of edges
	private ArrayList<Integer> edgeCosts;
	//list of directions???
	//private ArrayList<Boolean> directions;
	private boolean visited;

	public Vertex( E v )
	{
		value = v;
		edges = new ArrayList<Vertex>();
		edgeCosts = new ArrayList<Integer>();
		//directions = new ArrayList<Boolean>();
	}

	public E getValue()
	{
		return value;
	}

	public Vertex getEdge( int index )
	{
		return edges.get(index);
	}

	//for testing

	public ArrayList<Vertex> getEdgeList( )
	{
		return edges;
	}

	public String toString()
	{
		return (String) value;
	}

	//^^for testing

	public int getEdgeCost( int index )
	{
		return edgeCosts.get(index);
	}

	public boolean isVisited()
	{
		return visited;
	}

	public void setVisited( boolean b )
	{
		visited = b; 
	}

	/*public boolean getDirection( int index )
	{
		return directions.get(index);
	}*/

	public int numEdges()
	{
		return edges.size(); 
	}

	public boolean add( Vertex e, int ec )
	{
		edges.add( e );
		edgeCosts.add( ec );
		//directions.add( d );

		return true;
	}

}