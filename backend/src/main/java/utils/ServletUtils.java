package utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import api.model.Task;
import api.response.TaskResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ServletUtils {

	public static PrintWriter createPrintWriter(HttpServletResponse response) {
		PrintWriter printWriter = null;
		
		try {
			printWriter = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			printWriter.close();
		}
		
		return printWriter;
	}


	public static JsonObject convertTaskResponseToJson(TaskResponse taskResponse) {
		String message = taskResponse.getMessage();
		int statusCode = taskResponse.getStatusCode();
		Task task = taskResponse.getTask();
		JsonObject jsonObject = new JsonObject();
		if(task != null) {
			jsonObject.addProperty("statusCode", statusCode);
			jsonObject.addProperty("message", message);
			jsonObject.addProperty("taskId", task.getId());
			jsonObject.addProperty("taskName", task.getName());
			jsonObject.addProperty("taskDescription", task.getDescription());
			jsonObject.addProperty("taskStatus", task.isStatus());
		}
		
		return jsonObject;
	}
	
	public static List<JsonObject> convertTaskResponseToAListOfJson(TaskResponse taskResponse) {
		String message = taskResponse.getMessage();
		int statusCode = taskResponse.getStatusCode();
		List<Task> tasks = taskResponse.getTasks();
		List<JsonObject> jsonObjects = new ArrayList<JsonObject>();
		
		for(int i = 0; i < tasks.size(); i++) {
			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("statusCode", statusCode);
			jsonObject.addProperty("message", message);
			jsonObject.addProperty("taskId", tasks.get(i).getId());
			jsonObject.addProperty("taskName", tasks.get(i).getName());
			jsonObject.addProperty("taskDescription", tasks.get(i).getDescription());
			jsonObject.addProperty("taskStatus", tasks.get(i).isStatus());
			jsonObjects.add(jsonObject);
		}
		
		return jsonObjects;
	}
	
	public static JsonObject getBodyAsJson(HttpServletRequest request) {
		String requestBody = getRequestBody(request);
		JsonObject jsonObject = JsonParser.parseString(requestBody).getAsJsonObject();
		
		return jsonObject;
	}
	
	public static String getRequestBody(HttpServletRequest request) {
		String body = "";
		try {
			body = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return body;
	}
	
	public static String returnRouteFromADisplayName(String url) {
		ArrayList<String> displayNames = getDisplayNames();
		for(int i = 0; i < displayNames.size(); i++) {
			String display = displayNames.get(i);
			if(url.indexOf(display) > 0) {
				url = url.substring(url.indexOf(display), url.length());
			}
		}
		
		return url;
	}
	
	private static ArrayList<String> getDisplayNames() {
		ArrayList<String> datas = getDisplayNamesFromWebXml();
		String displayName = "";
		ArrayList<String> displayNames = new ArrayList<String>();
		for(int i = 0; i < datas.size(); i++) {
			displayName = datas.get(i).replace("<display-name>", "");
			displayName = displayName.replace("</display-name>", "");
			displayNames.add(displayName);
		}
		return displayNames;
	}
	
	private static ArrayList<String> getDisplayNamesFromWebXml() {
		File absolutePath = new File("src\\main\\webapp\\WEB-INF\\web.xml");
		Scanner scanner;
		ArrayList<String> datas = new ArrayList<String>();
		try {
			scanner = new Scanner(absolutePath);
			while (scanner.hasNext()) {
				String data = scanner.next();
				if(data.contains("display-name")) {
					datas.add(data);
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
		return datas;
	}
	
	
	

}