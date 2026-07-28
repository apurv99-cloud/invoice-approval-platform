package com.example.demo.Repository;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Organization;
import com.example.demo.Entity.WorkflowMaster;
import com.example.demo.Entity.WorkflowRule;

public interface WorkflowRuleRepository extends JpaRepository<WorkflowRule, Long> {

    boolean existsByWorkflow(
            WorkflowMaster workflow
    );

    Optional<WorkflowRule> findByWorkflow(
            WorkflowMaster workflow
    );

    Optional<WorkflowRule>
            findByWorkflow_OrganizationAndMinAmountLessThanEqualAndMaxAmountGreaterThanEqual(
                    Organization organization,
                    BigDecimal amount1,
                    BigDecimal amount2
            );

}
