package api.model;

public class Task {

	private long id;
	private String name;
	private String description;
	private boolean status;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Task() {
		super();
	}

	public Task(String name, String description, boolean status) {
		super();
		this.name = name;
		this.description = description;
		this.status = status;
	}
	
}
