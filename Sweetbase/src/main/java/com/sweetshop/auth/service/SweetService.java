package com.sweetshop.auth.service;

import com.sweetshop.auth.entity.Sweet;
import com.sweetshop.auth.repository.SweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SweetService {

    @Autowired
    private SweetRepository sweetRepository;

    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    public Sweet addSweet(Sweet sweet) {
        return sweetRepository.save(sweet);
    }

    public Sweet updateSweet(Integer id, Sweet sweetDetails) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));

        sweet.setSweetName(sweetDetails.getSweetName());
        sweet.setSweetCategory(sweetDetails.getSweetCategory());
        sweet.setSweetPrice(sweetDetails.getSweetPrice());
        sweet.setStockQuantity(sweetDetails.getStockQuantity());
        sweet.setSweetImage(sweetDetails.getSweetImage());

        return sweetRepository.save(sweet);
    }

    public void deleteSweet(Integer id) {
        sweetRepository.deleteById(id);
    }

    public Sweet purchaseSweet(Integer id, Integer quantity) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));

        if (sweet.getStockQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock for sweet: " + sweet.getSweetName());
        }

        sweet.setStockQuantity(sweet.getStockQuantity() - quantity);
        return sweetRepository.save(sweet);
    }
}
