import asyncio
from pymodbus.server.async_io import StartAsyncTcpServer
from pymodbus.device import ModbusDeviceIdentification
from pymodbus.datastore import ModbusSequentialDataBlock, ModbusSlaveContext, ModbusServerContext
import random


# Функция для обновления значений в регистрах
async def update_registers(context):
    while True:
        # Получаем контекст
        slave_id = 1
        #slave_id = 0x00
        register = 3  # 3 соответствует Holding Registers
        address = 0
        values = [random.randint(1, 100) for _ in range(3)]

        # Обновляем значения регистров
        context[slave_id].setValues(register, address, values)

        # Ждём 1 секунду перед следующим обновлением
        await asyncio.sleep(1)


# Настройка идентификации устройства
identity = ModbusDeviceIdentification()
identity.VendorName = 'Pymodbus'
identity.ProductCode = 'PM'
identity.VendorUrl = 'http://github.com/bashwork/pymodbus/'
identity.ProductName = 'Pymodbus Server'
identity.ModelName = 'Pymodbus Server'
identity.MajorMinorRevision = '1.0'

# Создание блоков данных для трёх устройств
store = ModbusSlaveContext(
    di=ModbusSequentialDataBlock(0, [0] * 100),
    co=ModbusSequentialDataBlock(0, [0] * 100),
    hr=ModbusSequentialDataBlock(0, [0] * 100),
    ir=ModbusSequentialDataBlock(0, [0] * 100)
)
context = ModbusServerContext(slaves=store, single=True)


async def main():
    # Запуск задачи для обновления регистров
    asyncio.create_task(update_registers(context))

    # Запуск сервера
    await StartAsyncTcpServer(context, identity=identity, address=("localhost", 5020))


# Запуск основного цикла событий
asyncio.run(main())
