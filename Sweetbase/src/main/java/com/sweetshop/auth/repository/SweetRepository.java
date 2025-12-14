package com.sweetshop.auth.repository;

import com.sweetshop.auth.entity.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SweetRepository extends JpaRepository<Sweet, Integer> {
    // Basic CRUD operations are provided by JpaRepository
}
