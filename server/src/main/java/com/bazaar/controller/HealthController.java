package main.java.com.bazaar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Bazaar Server");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/db-health")
    public ResponseEntity<Map<String, String>> databaseHealth() {
        Map<String, String> response = new HashMap<>();
        try (Connection connection = dataSource.getConnection()) {
            if (connection != null && !connection.isClosed()) {
                response.put("database", "Connected to PostgreSQL");
                response.put("status", "UP");
                response.put("url", connection.getMetaData().getURL());
            } else {
                response.put("database", "Not connected");
                response.put("status", "DOWN");
            }
        } catch (SQLException e) {
            response.put("database", "Connection failed");
            response.put("status", "DOWN");
            response.put("error", e.getMessage());
        }
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }
}
