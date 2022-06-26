package api.controller;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import utils.ServletUtils;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import api.model.Task;
import api.response.TaskResponse;
import api.service.TaskService;
import api.taskUtils.TaskUtils;

public class TaskController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public TaskController() {
        super();
    }

	public void init(ServletConfig config) throws ServletException {
	}
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String method = request.getMethod();
		String contentType = request.getContentType();
		response.setContentType(contentType);
		PrintWriter writer = response.getWriter();
		String prettyResponse = null;
		
		if(method.equals("PATCH")) {
			prettyResponse = this.doPatch(request, response);
		}else {
			super.service(request, response);
		}
		
		writer.print(prettyResponse);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TaskService taskService = new TaskService();
 		String contentType = request.getContentType();
 		response.setContentType(contentType);
 		response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
 		response.setHeader("Access-Control-Allow-Methods", "GET");
 		JsonObject jsonRepsonse = null;
		PrintWriter writer = response.getWriter();
		String url = ServletUtils.returnRouteFromADisplayName(request.getRequestURI());
		
		
		if(url.equals("servlet-api/servlet/api/task")) {
			String idText = request.getParameter("id");
			long id = Long.parseLong(idText);
			TaskResponse serverResponse = taskService.getById(id);
			
			jsonRepsonse = ServletUtils.convertTaskResponseToJson(serverResponse);
			writer.println(jsonRepsonse);
		}
		
		if(url.equals("servlet-api/servlet/api/tasks-by-status")) {
			List<JsonObject> jsonResponseList = null;
			JsonObject requestBody = ServletUtils.getBodyAsJson(request);
			JsonElement taskDescriptionAsJson = requestBody.get("status");
			
			boolean status = taskDescriptionAsJson.getAsBoolean();
			TaskResponse serverResponse = taskService.findAllTasksByStatus(status);

			jsonResponseList = ServletUtils.convertTaskResponseToAListOfJson(serverResponse);
			writer.println(jsonResponseList);
		}
		
		
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TaskService taskService = new TaskService();
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		JsonObject requestBody = ServletUtils.getBodyAsJson(request);
		JsonElement taskDescriptionAsJson = requestBody.get("description");
		JsonElement taskNameAsJson = requestBody.get("name");
		
		String taskDescription = taskDescriptionAsJson.getAsString();
		String taskName = taskNameAsJson.getAsString();
		
		Task task = new Task(taskName, taskDescription, false);
		TaskResponse serverResponse = taskService.save(task);
		
		String contentType = request.getContentType();
		response.setContentType(contentType);
		PrintWriter printWriter = response.getWriter();
		
		String prettyResonse = gson.toJson(ServletUtils.convertTaskResponseToJson(serverResponse));
		printWriter.print(prettyResonse);
	}
	
	public String doPatch(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TaskService taskService = new TaskService();
		String prettyResponse = null;
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String url = ServletUtils.returnRouteFromADisplayName(request.getRequestURI());
		
		
		if(url.equals("servlet-api/servlet/api/update-to-done")) {
			long id = TaskUtils.getIdFromJsonObject(request);
			TaskResponse serverResponse = taskService.updateTaskToDone(id);
			prettyResponse = gson.toJson(serverResponse);
		}
		
		if(url.equals("servlet-api/servlet/api/update-to-pending")) {
			long id = TaskUtils.getIdFromJsonObject(request);
			TaskResponse serverResponse = taskService.updateTaskToPendding(id);
			prettyResponse = gson.toJson(serverResponse);
		}
		
		if(url.equals("servlet-api/servlet/api/update-task-name")) {
			JsonObject requestBody = ServletUtils.getBodyAsJson(request);
			JsonElement taskNameAsJson = requestBody.get("name");
			JsonElement taskIdAsJson = requestBody.get("id");
			long id = taskIdAsJson.getAsLong();
			String name = taskNameAsJson.getAsString();
			TaskResponse serverResponse = taskService.updateTaskName(name, id);
			prettyResponse = gson.toJson(serverResponse);
		}
		
		if(url.equals("servlet-api/servlet/api/update-task-description")) {
			JsonObject requestBody = ServletUtils.getBodyAsJson(request);
			JsonElement taskDescriptionAsJson = requestBody.get("description");
			JsonElement taskIdAsJson = requestBody.get("id");
			long id = taskIdAsJson.getAsLong();
			String description = taskDescriptionAsJson.getAsString();
			TaskResponse serverResponse = taskService.updateTaskDescription(description, id);
			prettyResponse = gson.toJson(serverResponse);
		}
		
		return prettyResponse;
	}

	public void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		TaskService taskService = new TaskService();
 		String contentType = request.getContentType();
		String prettyResponse = null;
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		response.setContentType(contentType);
		PrintWriter writer = response.getWriter();
		
		String idText = request.getParameter("id");
		long id = Long.parseLong(idText);
		
		TaskResponse serverResponse = taskService.delete(id);
		prettyResponse = gson.toJson(serverResponse);
		
		writer.print(prettyResponse);
	}

	
	public void destroy() {
	}
}
