// import * as mutations from '../src/graphql/mutations';
// import { API, graphqlOperation } from "aws-amplify";

(function($) {
    $.fn.orgChart = function(options) {
        var opts = $.extend({}, $.fn.orgChart.defaults, options);
        return new OrgChart($(this), opts);        
    }

    $.fn.orgChart.defaults = {
        data: [{id:1, name:'Root', parent: 0, time_stamp: (new Date()).getTime()}],
        showControls: false,
        allowEdit: true,
        onAddNode: null,
        onDeleteNode: null,
        onClickNode: null,
        newNodeText: 'new idea'
    };

    // document.getElementById("create_new_node_div").addEventListener("click", myFunction);





    function OrgChart($container, opts){
        var data = opts.data;
        var nodes = {};
        var rootNodes = [];
        this.opts = opts;
        this.$container = $container;
        var self = this;

        var clicking_record = []
        var previousOneIsOtherClick = false
        var current_working_id = 0
        // will have: time_stamp, type of click request, id, current_data_length

        document.onclick= function(event){
            var x = document.getElementsByClassName("jquery-modal blocker current");
            setTimeout(function(){
                var is_program_click = sessionStorage.getItem("is_program_click");
                if(is_program_click==true){
                    // console.log(is_program_click)
                    sessionStorage.setItem("is_program_click", false);
                }else{
                    if(x.length==0 & previousOneIsOtherClick==false){
                        // console.log("this is the click")
                        self.recordClicks(3, current_working_id)
                        // console.log("quit editing click ", current_working_id) 
                        previousOneIsOtherClick = true
                    }else if(x.length==0 & previousOneIsOtherClick==true){
                        previousOneIsOtherClick = true
                    }
                    else{
                        previousOneIsOtherClick = false
                    }
                }

            }, 3);
        };



        $("#create_new_node_div" ).click(function(e) {

            // get the parent node id
            thisId = document.getElementById("create_new_node").getAttribute("value");

            // get the inputed idea
            idea_value = $("#idea_input_text").text()

            // check if the idea is valid
            if(idea_value==""){
                $("#idea_input_hint_more").html("please enter the idea content first")
                e.stopPropagation();
                return
            }else if(idea_value==null){
                $("#idea_input_hint_more").html("please enter the idea content first")
                e.stopPropagation();
                return
            }

            new_node_id_to_scroll_to = Object.keys(nodes).length+1
            sessionStorage.setItem("latest_node_position", 'idea_content_'+new_node_id_to_scroll_to);

            // add the node data using our class methods
            if(self.opts.onAddNode !== null){
                self.opts.onAddNode(nodes[thisId]);
            }
            else{
                self.newNode(thisId);
            }

            // console.log("this means I create")
            self.recordClicks(2, thisId)

            // decide what the child id should be
            new_child_id = Object.keys(nodes).length

            // add the basic value to it
            nodes[new_child_id].data.name = idea_value
            nodes[new_child_id].data.time_stamp = (new Date()).getTime()
            $('#idea_content_'+new_child_id).html(idea_value)


            $("#idea_input_hint_more").html("")
            $("#idea_input_text").text("")

            // console.log(event.target.parentNode.parentNode)
            // event.target.parentNode.parentNode.style.display = "none";
            // $('#close_modal_link').trigger("click");

            e.stopPropagation();
            sessionStorage.setItem("is_program_click", true);

            document.getElementById('close_modal_link').click();
            // window.location.href = "close-modal";

            // document.getElementById('#idea_content_'+new_child_id).focus();
            // window.moveTo(500, 100);



            var element = document.getElementById(sessionStorage.getItem("latest_node_position"))
            var origcolor = element.style.backgroundColor
            element.style.backgroundColor = "rgb(253, 255, 71, 1)";
            // element.style.transition = "all 2s";
            // element.style.backgroundColor = origcolor;
            // $("#"+sessionStorage.getItem("latest_node_position")).css('transition',"background-color 0.5s ease;"); 


            setTimeout(function(){
                element.style.backgroundColor = "rgb(253, 255, 71, 0.9)";
                setTimeout(function(){
                    element.style.backgroundColor = "rgb(253, 255, 71, 0.8)";
                    setTimeout(function(){
                        element.style.backgroundColor = "rgb(253, 255, 71, 0.7)";
                        setTimeout(function(){
                            element.style.backgroundColor = "rgb(253, 255, 71, 0.6)";
                            setTimeout(function(){
                                element.style.backgroundColor = "rgb(253, 255, 71, 0.5)";
                                setTimeout(function(){
                                    element.style.backgroundColor = "rgb(253, 255, 71, 0.4)";
                                    setTimeout(function(){
                                        element.style.backgroundColor = "rgb(253, 255, 71, 0.2)";
                                        setTimeout(function(){
                                            element.style.backgroundColor = "rgb(253, 255, 71, 0.1)";
                                            setTimeout(function(){
                                                element.style.backgroundColor = origcolor;
                                            },200);
                                        },200);
                                    },200);
                                },200);
                            },200);
                        },200);
                    },200);
                },200);
            },200);

        });

        $("#initialize_node_btn" ).click(function(e) {
            var seedword = sessionStorage.getItem("seedword")
            // console.log("????", seedword)
            nodes[1].data.name = seedword
            self.draw();
            e.stopPropagation();
        });



        $("#send_api_request").click(function(e){
            // console.log("seriously")

            node_id_data = []
            node_value_data = []
            node_parent_data = []
            node_time_data = []

            for (var i=1 ; i<=Object.keys(nodes).length; i++){
                _dict = nodes[i].data
                node_id_data.push(_dict.id)
                node_value_data.push(_dict.name)
                node_parent_data.push(_dict.parent)
                node_time_data.push(_dict.time_stamp)
            }


            click_id_data = []
            click_type_data = []
            click_time_data = []

            for (_dict of clicking_record){
                click_time_data.push(_dict.time_stamp)
                click_type_data.push(_dict.click_type)
                click_id_data.push(_dict.id)
            }

            // console.log(node_id_data)

            var success_code = function () {
              return Math.random().toString(36).substr(2, 6);
            };

            const userInfo = { name: "test",
                                success_code: success_code(),
                                invitation_code: sessionStorage.getItem("invitation_code"),
                                node_index: node_id_data,
                                node_parent: node_parent_data,
                                node_value: node_value_data,
                                node_time: node_time_data,
                                click_index: click_id_data,
                                click_type: click_type_data,
                                click_time: click_time_data
                            };
            
            var jsonObject = JSON.stringify(userInfo);
            sessionStorage.setItem("tree_data_obj", jsonObject);
            // console.log('invitation code is: ', sessionStorage.getItem("invitation_code"))
            
            // document.getElementById('cloud_api_button').click({userInfo: userInfo})
            
            e.stopPropagation();
        });

        this.draw = function(){
            // console.log("drawing")


            // empty the page and draw
            $container.empty().append(rootNodes[0].render(opts));

            // add "add button" listener
            $container.find('.org-add-link-new').click(function(e){
                var thisId = $(this).parent().attr('node-id');

                // paranet idea value
                // get the inputed idea
                parent_idea_value = nodes[thisId].data.name
                // console.log(parent_idea_value)
                if(thisId==1){
                    $("#idea_input_hint").html("idea generated for: " + parent_idea_value)
                }else{
                    $("#idea_input_hint").html("idea generated from: " + parent_idea_value)
                }

                self.recordClicks(1, thisId)
                current_working_id = thisId
                // console.log("creating child for: ", thisId)

                document.getElementById("create_new_node").setAttribute("value", thisId);
            });

            $("h2[contenteditable]").on('focus', function(e){
                self.recordClicks(4, this.getAttribute("value"))
                // console.log(4, "edit", this.getAttribute("value"))
            });

            $("h2[contenteditable]").on('blur', function(e){
                self.recordClicks(5, this.getAttribute("value"))
                // console.log(5, "edit", this.getAttribute("value"))
                // console.log("ending edit", this.getAttribute("value"))
                // console.log($(this).text())
                nodes[this.getAttribute("value")].data.name = $(this).text()
            });


            // location_id = sessionStorage.getItem("latest_node_position");
            // console.log(document.getElementById(location_id))
            // document.getElementById(location_id).scrollIntoView();

        }

        this.startEdit = function(id){
            var inputElement = $('<input class="org-input" type="text" value="'+nodes[id].data.name+'"/>');
            $container.find('div[node-id='+id+'] h2').replaceWith(inputElement);
            var commitChange = function(){
                var h2Element = $('<h2 id="idea_content_'+self.data.id+'">'+nodes[id].data.name+'</h2>');
                if(opts.allowEdit){
                    h2Element.click(function(){
                        self.startEdit(id);
                    })
                }
                inputElement.replaceWith(h2Element);
            }  
            inputElement.focus();
            inputElement.keyup(function(event){
                if(event.which == 13){
                    commitChange();
                }
                else{
                    nodes[id].data.name = inputElement.val();
                }
            });
            inputElement.blur(function(event){
                commitChange();
            })
        }

        this.newNode = function(parentId){
            var nextId = Object.keys(nodes).length;
            while(nextId in nodes){
                nextId++;
            }

            self.addNode({id: nextId, name: '', parent: parentId});

            // console.log(sessionStorage.getItem("latest_node_position"))
            // console.log($("#"+sessionStorage.getItem("latest_node_position")).offset())
            // console.log($("#orgChartContainer").offset())


            if($("#"+sessionStorage.getItem("latest_node_position")).offset().left > (-150+window.innerWidth)){
                console.log("yes")

                $("#orgChartContainer").animate({
                    scrollLeft: $("#"+sessionStorage.getItem("latest_node_position")).offset().left-$("#orgChart").offset().left-140
                    // scrollLeft: $("#"+sessionStorage.getItem("latest_node_position")).offset().left,
                }, 1000);


                // setTimeout(function(){
                //     $("#orgChartContainer").scrollLeft($("#"+sessionStorage.getItem("latest_node_position")).offset().left-$("#orgChart").offset().left);
                // },0);
            }else{

            }

            if($("#"+sessionStorage.getItem("latest_node_position")).offset().top > (-80+window.innerHeight+window.pageYOffset)){
                console.log("v scroll")
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#"+sessionStorage.getItem("latest_node_position")).offset().top,
                    // scrollLeft: $("#"+sessionStorage.getItem("latest_node_position")).offset().left,
                }, 1000);
            }else{

            }



            // var element = document.getElementById(sessionStorage.getItem("latest_node_position"))
            // var origcolor = element.style.backgroundColor
            // element.style.backgroundColor = "rgb(253, 255, 71, 1)";
            // element.style.transition = "all 2s";
            // element.style.backgroundColor = origcolor;
            // $("#"+sessionStorage.getItem("latest_node_position")).css('transition',"background-color 0.5s ease;"); 


            // for(var i=1; i>=0; i=i-0.01){ //i represents the lightness
            //     setInterval(function(){
            //         element.style.backgroundColor = "rgb(253, 255, 71, "+i+")";
            //     },100);
            // }
            
        }

        this.addNode = function(data){
            var newNode = new Node(data);
            nodes[data.id] = newNode;
            nodes[data.parent].addChild(newNode);

            self.draw();
        }

        this.deleteNode = function(id){
            for(var i=0;i<nodes[id].children.length;i++){
                self.deleteNode(nodes[id].children[i].data.id);
            }
            nodes[nodes[id].data.parent].removeChild(id);
            delete nodes[id];
            self.draw();
        }

        this.getData = function(){
            var outData = [];
            for(var i in nodes){
                outData.push(nodes[i].data);
            }
            return outData;
        }


        this.recordClicks = function(click_type, id){
            // will have: time_stamp, type of click request, id, current_data_length
            // console.log("recording")
            record = {time_stamp: (new Date()).getTime(), 
                    click_type: click_type, 
                    id: Number(id), 
                    num_of_total_idea: Object.keys(nodes).length}
            // console.log("recorded: ", record)
            clicking_record.push(record)
        }

        // constructor
        for(var i in data){
            var node = new Node(data[i]);
            nodes[data[i].id] = node;
        }

        // generate parent child tree
        for(var i in nodes){
            if(nodes[i].data.parent == 0){
                rootNodes.push(nodes[i]);
            }
            else{
                nodes[nodes[i].data.parent].addChild(nodes[i]);
            }
        }

        // draw org chart
        $container.addClass('orgChart');
        self.draw();
    }

    function Node(data){
        this.data = data;
        this.children = [];
        var self = this;

        this.addChild = function(childNode){
            this.children.push(childNode);
        }

        this.removeChild = function(id){
            for(var i=0;i<self.children.length;i++){
                if(self.children[i].data.id == id){
                    self.children.splice(i,1);
                    return;
                }
            }
        }

        this.render = function(opts){
            var childLength = self.children.length,
                mainTable;

            mainTable = "<table cellpadding='0' cellspacing='0' border='0'>";
            var nodeColspan = childLength>0?2*childLength:2;
            mainTable += "<tr><td colspan='"+nodeColspan+"'>"+self.formatNode(opts)+"</td></tr>";

            if(childLength > 0){
                var downLineTable = "<table cellpadding='0' cellspacing='0' border='0'><tr class='lines x'><td class='line left half'></td><td class='line right half'></td></table>";
                mainTable += "<tr class='lines'><td colspan='"+childLength*2+"'>"+downLineTable+'</td></tr>';

                var linesCols = '';
                for(var i=0;i<childLength;i++){
                    if(childLength==1){
                        linesCols += "<td class='line left half'></td>";    // keep vertical lines aligned if there's only 1 child
                    }
                    else if(i==0){
                        linesCols += "<td class='line left'></td>";     // the first cell doesn't have a line in the top
                    }
                    else{
                        linesCols += "<td class='line left top'></td>";
                    }

                    if(childLength==1){
                        linesCols += "<td class='line right half'></td>";
                    }
                    else if(i==childLength-1){
                        linesCols += "<td class='line right'></td>";
                    }
                    else{
                        linesCols += "<td class='line right top'></td>";
                    }
                }
                mainTable += "<tr class='lines v'>"+linesCols+"</tr>";

                mainTable += "<tr>";
                for(var i in self.children){
                    mainTable += "<td colspan='2'>"+self.children[i].render(opts)+"</td>";
                }
                mainTable += "</tr>";
            }
            mainTable += '</table>';
            return mainTable;
        }

        this.formatNode = function(opts){
            var nameString = '',
                descString = '';
            if(typeof data.name !== 'undefined'){
                if(self.data.id == 1){
                    nameString = '<h2 class="" id="idea_content_'+self.data.id+'" value="'+self.data.id+'">'+self.data.name+'</h2>';
                }else{
                    nameString = '<h2 contenteditable class="node_value_edit" id="idea_content_'+self.data.id+'" value="'+self.data.id+'">'+self.data.name+'</h2>';
                }
            }
            if(typeof data.description !== 'undefined'){
                descString = '<p>'+self.data.description+'</p>';
            }
            if(opts.showControls){
                var buttonsHtml = '<a class="btn org-add-link-new" style="text-decoration: none;" href="#input_modal" rel="modal:open">+ new idea</a>'
            }
            else{
                buttonsHtml = '';
            }
            return "<div class='node' node-id='"+this.data.id+"'>"+nameString+descString+buttonsHtml+"</div>";
        }
    }

})(jQuery);

