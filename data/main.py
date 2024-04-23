from userSettings import userSettings

class main:
    print("Hello, world!")
    test1 = userSettings("theman","theman@gmail.com","mahman")
    print(test1.user_id)
    print(test1.account_created_date)
    test1.setBirthday('january', "1", "1998")
    print(test1.birthday)