package api.response;

import java.util.List;

import com.google.gson.JsonObject;

public class TaskJsonResponse {

	private List<JsonObject> jsonObjectList;
	private JsonObject jsonObject;
	
	public TaskJsonResponse() {}
	
	public TaskJsonResponse(JsonObject jsonObject) {
		this.jsonObject = jsonObject;
	}

	public TaskJsonResponse(JsonObject jsonObject, List<JsonObject> jsonObjectList) {
		this.jsonObject = jsonObject;
		this.jsonObjectList = jsonObjectList;
	}

	public List<JsonObject> getJsonObjectList() {
		return jsonObjectList;
	}

	public void setJsonObjectList(List<JsonObject> jsonObjectList) {
		this.jsonObjectList = jsonObjectList;
	}

	public JsonObject getJsonObject() {
		return jsonObject;
	}

	public void setJsonObject(JsonObject jsonObject) {
		this.jsonObject = jsonObject;
	}
	
}
