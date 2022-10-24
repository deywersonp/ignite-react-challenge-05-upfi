import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* <ModalOverlay />
    <ModalContent>
      <ModalBody>
        <Lorem count={2} />
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant="ghost">Secondary Action</Button>
      </ModalFooter>
    </ModalContent> */}
    </Modal>
  );
}
