package com.eikesi.manage.repository.search;

import com.eikesi.manage.domain.CustomerRelation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CustomerRelation entity.
 */
public interface CustomerRelationSearchRepository extends ElasticsearchRepository<CustomerRelation, Long> {
}
