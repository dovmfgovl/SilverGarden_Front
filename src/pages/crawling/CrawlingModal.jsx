import React from 'react';

const CrawlingModal = ({ showModal, handleModalClose, dataList }) => {
  // 선택된 크롤링 데이터 가져오기
    const selectedCrawling = dataList ? dataList[0] : '';
    console.log(dataList);
    console.log(selectedCrawling);
    return (
        <div style={{ display: showModal ? 'block' : 'none' }} className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: 'white', border: '1px solid #34495E', color: 'black' }}>
            <div className="modal-header">
                <h6 className="modal-title">{`${selectedCrawling ? selectedCrawling.CRAWLED_TITLE : '상세정보'}(${selectedCrawling ? selectedCrawling.REG_DATE : ''})`}</h6>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
            </div>
            <div className="modal-body">
                {selectedCrawling && selectedCrawling.CRAWLED_CONTENT ? (
                    <p>{selectedCrawling.CRAWLED_CONTENT}</p>
                ) : (
                    <p>링크 참고</p>
                )}
            </div>
            <div className="modal-footer">
                <a href={selectedCrawling ? selectedCrawling.CRAWLED_URL : '#'} target="_blank" className="btn btn-primary">
                링크
                </a>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleModalClose}>
                닫기
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default CrawlingModal;
