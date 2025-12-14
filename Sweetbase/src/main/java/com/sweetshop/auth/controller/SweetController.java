package com.sweetshop.auth.controller;

import com.sweetshop.auth.entity.Sweet;
import com.sweetshop.auth.service.SweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

    @Autowired
    private SweetService sweetService;

    // Public or User/Admin accessible to view sweets
    @GetMapping
    public List<Sweet> getAllSweets() {
        return sweetService.getAllSweets();
    }

    // Admin only: Add new sweet
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> addSweet(@RequestBody Sweet sweet) {
        Sweet newSweet = sweetService.addSweet(sweet);
        return ResponseEntity.ok(newSweet);
    }

    // Admin only: Update sweet
    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> updateSweet(@PathVariable Integer id, @RequestBody Sweet sweet) {
        Sweet updatedSweet = sweetService.updateSweet(id, sweet);
        return ResponseEntity.ok(updatedSweet);
    }

    // Admin only: Delete sweet
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteSweet(@PathVariable Integer id) {
        sweetService.deleteSweet(id);
        return ResponseEntity.ok("Sweet deleted successfully");
    }

    // Authenticated Users: Purchase sweet
    @PostMapping("/purchase/{id}")
    public ResponseEntity<Sweet> purchaseSweet(@PathVariable Integer id,
            @RequestParam(defaultValue = "1") Integer quantity) {
        Sweet purchasedSweet = sweetService.purchaseSweet(id, quantity);
        return ResponseEntity.ok(purchasedSweet);
    }
}
