import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { useState } from 'react';

function Pagination({ totalItems, itemsPerPage, onPageChange, maxButtons = 5, currentPage, setCurrentPage }: 
  {totalItems: any, itemsPerPage: any, onPageChange: any, maxButtons?: any, currentPage: any, setCurrentPage: any}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = currentPage - Math.floor(maxButtons / 2);
    startPage = Math.max(startPage, 1);
    const endPage = Math.min(startPage + maxButtons - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          color={'white'}
          colorScheme={i === currentPage ? 'purple' : 'gray'}
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Box>
      <ButtonGroup spacing={1}>
        <Button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        {renderPageNumbers()}
        <Button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default Pagination;