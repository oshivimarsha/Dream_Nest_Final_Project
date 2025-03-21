package lk.ijse.dreamnest_finalproject.service;

import lk.ijse.dreamnest_finalproject.dto.CabDTO;

public interface CabService {

    int saveCab(CabDTO cabDTO);

    int updateCab(CabDTO cabDTO);

    Object getAllCab();

    int deleteCab(Long cabId);
}
