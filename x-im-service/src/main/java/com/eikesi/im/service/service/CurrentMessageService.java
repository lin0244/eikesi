package com.eikesi.im.service.service;

import com.eikesi.im.service.domain.CurrentMessage;
import com.eikesi.im.service.repository.CurrentMessageRepository;
import com.eikesi.im.service.service.dto.CurrentMessageDTO;
import com.eikesi.im.service.service.mapper.CurrentMessageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing CurrentMessage.
 */
@Service
@Transactional
public class CurrentMessageService {

    private final Logger log = LoggerFactory.getLogger(CurrentMessageService.class);

    private final CurrentMessageRepository currentMessageRepository;

    private final CurrentMessageMapper currentMessageMapper;

    public CurrentMessageService(CurrentMessageRepository currentMessageRepository, CurrentMessageMapper currentMessageMapper) {
        this.currentMessageRepository = currentMessageRepository;
        this.currentMessageMapper = currentMessageMapper;
    }

    /**
     * Save a currentMessage.
     *
     * @param currentMessageDTO the entity to save
     * @return the persisted entity
     */
    public CurrentMessageDTO save(CurrentMessageDTO currentMessageDTO) {
        log.debug("Request to save CurrentMessage : {}", currentMessageDTO);
        CurrentMessage currentMessage = currentMessageMapper.toEntity(currentMessageDTO);
        currentMessage = currentMessageRepository.save(currentMessage);
        return currentMessageMapper.toDto(currentMessage);
    }

    /**
     * Get all the currentMessages.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CurrentMessageDTO> findAll() {
        log.debug("Request to get all CurrentMessages");
        return currentMessageRepository.findAll().stream()
            .map(currentMessageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one currentMessage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CurrentMessageDTO findOne(Long id) {
        log.debug("Request to get CurrentMessage : {}", id);
        CurrentMessage currentMessage = currentMessageRepository.findOne(id);
        return currentMessageMapper.toDto(currentMessage);
    }

    /**
     * Delete the currentMessage by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CurrentMessage : {}", id);
        currentMessageRepository.delete(id);
    }
}