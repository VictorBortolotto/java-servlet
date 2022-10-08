package api.taskUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import api.model.Task;
import api.response.TaskJsonResponse;
import api.response.TaskResponse;
import jakarta.servlet.http.HttpServletRequest;
import utils.ServletUtils;

public class TaskUtils {

	public static TaskJsonResponse convertApiResponseToJson(TaskResponse taskResponse) {
		TaskJsonResponse taskJsonResponse = null;
		
		if (taskResponse.getStatusCode() == 404 || taskResponse.getStatusCode() == 500) {
			taskJsonResponse = new TaskJsonResponse(convertResponseMessageToJson(taskResponse));
		}
		
		if (taskResponse.getStatusCode() == 200 && taskResponse.getTask() != null) {
			taskJsonResponse = new TaskJsonResponse(convertTaskToJson(taskResponse));
		}
		
		if (taskResponse.getStatusCode() == 200 && taskResponse.getTasks() != null) {
			taskJsonResponse = new TaskJsonResponse(convertResponseMessageToJson(taskResponse), convertTaskResponseToAListOfJson(taskResponse));
		}
		
		if(taskResponse.getStatusCode() == 200 && taskResponse.getTasks() == null && taskResponse.getTask() == null) {
			taskJsonResponse = new TaskJsonResponse(convertResponseMessageToJson(taskResponse));
		}
		
		return taskJsonResponse;
	}
	
	private static JsonObject convertResponseMessageToJson(TaskResponse taskResponse) {
		JsonObject jsonResponseMessageObject = new JsonObject();
		
		jsonResponseMessageObject.addProperty("status_code", taskResponse.getStatusCode());
		jsonResponseMessageObject.addProperty("message", taskResponse.getMessage());
		
		return jsonResponseMessageObject; 
	}
	
	private static JsonObject convertTaskToJson(TaskResponse taskResponse) {
		JsonObject jsonObject = new JsonObject();
		Task task = taskResponse.getTask();
		jsonObject = convertResponseMessageToJson(taskResponse);
		
		jsonObject.addProperty("taskId", task.getId());
		jsonObject.addProperty("taskName", task.getName());
		jsonObject.addProperty("taskDescription", task.getDescription());
		jsonObject.addProperty("taskStatus", task.isStatus());
		
		return jsonObject;
	}
	
	private static List<JsonObject> convertTaskResponseToAListOfJson(TaskResponse taskResponse) {
		List<Task> tasks = taskResponse.getTasks();
		List<JsonObject> jsonObjects = new ArrayList<JsonObject>();
		
		for(int i = 0; i < tasks.size(); i++) {
			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("taskId", tasks.get(i).getId());
			jsonObject.addProperty("taskName", tasks.get(i).getName());
			jsonObject.addProperty("taskDescription", tasks.get(i).getDescription());
			jsonObject.addProperty("taskStatus", tasks.get(i).isStatus());
			jsonObjects.add(jsonObject);
		}
		
		return jsonObjects;
	}
	
	public static Task getOneTaskFromAResultSet(ResultSet resultSet) throws SQLException {
		Task task = new Task();
		
		if (resultSet.next()) {
			task.setId(resultSet.getLong("id"));
			task.setName(resultSet.getString("name"));
			task.setDescription(resultSet.getString("description"));
			task.setStatus(resultSet.getBoolean("status"));
		}
		
		return task;
	}
	
	public static List<Task> getTasksFromAResultSet(ResultSet resultSet) throws SQLException {
		List<Task> tasks = new ArrayList<Task>();
		
		while (resultSet.next()) {
			Task task = new Task();
			task.setId(resultSet.getLong("id"));
			task.setName(resultSet.getString("name"));
			task.setDescription(resultSet.getString("description"));
			task.setStatus(resultSet.getBoolean("status"));
			tasks.add(task);
		}
		
		return tasks;
	}
	
}
