import React ,{useState}from 'react';
import {
  Box,
  FormControl,
  Modal,
  TextArea,
  Input,
  Image,
  HStack,
  VStack,
  Text,
  Center,
  Button,
  Radio
} from 'native-base';

const NewItemModal = props => {
  const {showModal,setShowModal,handleNewItem}=props
  const [type, setType] = useState('false');
  const [price, setPrice]= useState('')
  const [item,setItem]=useState('')
  return (
    <Center>

    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>New Item</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Item</FormControl.Label>
            <Input  onChangeText={text=>setItem(text)  }/>
          </FormControl>
          <Radio.Group
      name="myRadioGroup"
      value={type}
      onChange={(nextValue) => {
        setType(nextValue);
      }}
    mt='7%'
      
    >
      <Radio value='false' my="1">
        Default
      </Radio>
      <Radio value='true' my="1" >
        Flavour
      </Radio>
    </Radio.Group>
          <FormControl mt="3">
            <FormControl.Label>price</FormControl.Label>
            <Input  onChangeText={ text=> setPrice(text)} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
            setShowModal(false);
          }}>
              Cancel
            </Button>
            <Button onPress={() => {
            setShowModal(false);
            handleNewItem(item,type,price)
        
          }}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  </Center>
  )}

export default NewItemModal;
