function getData() {
    myData = [
                {
                group: "group1",
                data: [
                        {
                            label: "label1",
                            data: [
                                    {
                                        timeRange: ['2017/11/27 20:30', '2017/11/27 21:30'],
                                            val: "A"
                                    }, 
                                    {
                                        timeRange: ['2017/11/28 19:30', '2017/11/28 21:30'],
                                            val: "B"
                                    }
                                ]
                        }
                    ]
                },{
                group: "group2",
                data: [
                        {
                            label: "label2",
                            data: [
                                    {
                                        timeRange: ['2017/11/27 19:30', '2017/11/27 21:30'],
                                            val: "A"
                                    }, 
                                    {
                                        timeRange: ['2017/11/28 19:30', '2017/11/28 21:30'],
                                            val: "B"
                                    }
                                ]
                        }
                    ]
                }
        ]

    alert("正常動作中")

    return myData

  }